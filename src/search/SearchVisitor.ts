import { HtmlFileContents } from "ssg-api"
import { HtmlRR0Context } from "../RR0Context.js"
import fs from "fs"
import { TimeTextBuilder } from "../time/text/TimeTextBuilder.js"
import { FileVisitor } from "../RR0ContentStep.js"
import path from "path"

export type PageInfo = {
  title: string
  url: string
  time: string
  /**
   * Other names the page can be searched by, such as a people's surnames and pseudonyms.
   */
  names?: string[]
  html?: string
}

type WordCount = {
  pageIndex: number;
  count: number;
}

export type SearchIndex = {
  pages: PageInfo[],
  words: {
    [key: string]: WordCount[]
  }
}

export type SearchCommandConfig = {
  notIndexedUrls: string[]
  indexWords: boolean
  indexContent?: string
}

/**
 * Builds an index of pages.
 */
export class SearchVisitor implements FileVisitor {

  static resultTitle(pageInfo: PageInfo): string {
    const {title, time} = pageInfo
    return title + (time && time !== title.toLowerCase() ? ` (${time})` : "")
  }

  readonly index: SearchIndex = {
    pages: [],
    words: {}
  }

  protected readonly contentStream: fs.WriteStream | undefined

  constructor(protected config: SearchCommandConfig, protected timeTextBuilder: TimeTextBuilder) {
    const indexContent = this.config.indexContent
    if (indexContent) {
      this.contentStream = fs.createWriteStream(indexContent)
    }
  }

  async contentStepEnd() {
    const contentStream = this.contentStream
    if (contentStream) {
      contentStream.write("\n]")
      contentStream.end()
    }
  }

  async visit(context: HtmlRR0Context): Promise<void> {
    const file = context.file
    const pageInfo = this.pageInfo(context)
    if (pageInfo) {
      const indexedPages = this.index.pages
      const pageIndex = indexedPages.findIndex(page => page.url === pageInfo.url)
      const resultTitle = SearchVisitor.resultTitle(pageInfo)
      const titleIndexed = indexedPages.find(
        page => SearchVisitor.resultTitle(page) === resultTitle && page.url !== pageInfo.url)
      if (titleIndexed) {
        this.handleAlreadyIndexed(resultTitle, pageInfo.url, titleIndexed)
      }
      if (pageIndex >= 0) {
        indexedPages[pageIndex] = pageInfo
      } else {
        indexedPages.push(pageInfo)
      }
    }
    if (this.config.indexWords) {
      this.indexWords(context, file)
    }
    if (this.config.indexContent) {
      this.indexContent(context, file)
    }
  }

  pageInfo(context: HtmlRR0Context, contentRoot?: string): PageInfo | undefined {
    const file = context.file
    const url = contentRoot
      ? path.relative(contentRoot, file.name).split(path.sep).join("/")
      : file.name.startsWith("out/") ? file.name.substring("out/".length) : file.name
    return this.pageInfoFrom(file.title, url, context)
  }

  pageInfoFrom(title: string, url: string, context: HtmlRR0Context, names: string[] = []): PageInfo | undefined {
    if (!title || this.config.notIndexedUrls.includes(url)) {
      return undefined
    }
    const time = this.timeTextBuilder.build(context, {year: "numeric", month: "short", day: "numeric"}).toLowerCase()
    const pageInfo: PageInfo = {title, url, time}
    const otherNames = Array.from(new Set(names.filter(name => name && name !== title)))
    if (otherNames.length > 0) {
      pageInfo.names = otherNames
    }
    return pageInfo
  }

  protected handleAlreadyIndexed(resultTitle: string, url: string, titleIndexed: PageInfo) {
    throw new Error(`Search result "${resultTitle}" with URL ${url} is already indexed with URL ${titleIndexed.url}`)
  }

  protected getContents(doc: Document) {
    const div = doc.createElement("div")
    div.append(doc.body)
    this.removeTags(div, "script")
    this.removeTags(div, "nav")
    this.removeTags(div, "footer")
    return div.textContent
  }

  protected indexContent(context: HtmlRR0Context, outputFile: HtmlFileContents) {
    const contents = this.getContents(outputFile.document)
    const contentsRecord: PageInfo = {
      title: outputFile.title,
      url: context.file.name,
      time: context.time.toString(),
      html: contents
    }
    const prefix = this.contentStream.bytesWritten === 0 ? "[\n" : ",\n"
    const str = prefix + JSON.stringify(contentsRecord)
    this.contentStream.write(str)
  }

  protected indexWords(context: HtmlRR0Context, outputFile: HtmlFileContents) {
    const pageIndex = this.index.pages.length
    const nonSignificant = context.messages.nonSignificantWords
    const contents = this.getContents(outputFile.document)
    const pageText = contents.toLowerCase()
    const pageWords = pageText.split(/[ \t,.…'’\-" :!?;()\[\]\n]/g)
      .filter(w => w.length > 1)
      .filter(w => !nonSignificant.includes(w))
      .filter(w => {
        const num = parseInt(w, 10)
        return Number.isNaN(num) || num > 1000
      })
    const pageWordsCount = new Map<string, number>()
    for (const pageWord of pageWords) {
      let pageWordCount = pageWordsCount.get(pageWord)
      if (!pageWordCount) {
        pageWordCount = 0
      }
      pageWordsCount.set(pageWord, pageWordCount + 1)
    }
    for (const word of new Set(pageWords)) {
      let existingWordCounts = this.index.words[word]
      if (!existingWordCounts) {
        existingWordCounts = this.index.words[word] = []
      }
      const pageWordCount = pageWordsCount.get(word)
      existingWordCounts.push({pageIndex, count: pageWordCount})
    }
  }

  protected removeTags(div: HTMLDivElement, selector: string) {
    const found = div.querySelectorAll(selector)
    let i = found.length
    while (i--) {
      found[i].parentNode.removeChild(found[i])
    }
  }
}
