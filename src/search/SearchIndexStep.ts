import { SsgContext, SsgStep } from "ssg-api"
import { PageInfo, SearchIndex, SearchVisitor } from "./SearchVisitor.js"
import fs from "fs"
import { writeFile } from "@javarome/fileutil"
import path from "path"
import { glob } from "glob"
import { HtmlRR0Context } from "../RR0Context.js"

/**
 * Saves the index file collected by the SearchCommand.
 */
export class SearchIndexStep implements SsgStep {

  protected encoding: BufferEncoding = "utf8"

  /**
   * @param fileName The index file path
   * @param searchCommand The command that collected the pages info.
   */
  constructor(protected fileName: string, protected searchCommand: SearchVisitor,
              protected contentRoot?: string,
              protected prepareContext?: (context: HtmlRR0Context, fileName: string) => void) {
  }

  /**
   * Write the search index file.
   *
   * @param context
   */
  async execute(context: SsgContext): Promise<any> {
    const newIndex = this.searchCommand.index
    let existingIndex: SearchIndex
    if (this.contentRoot) {
      const pagesByUrl = new Map<string, PageInfo>()
      const pagesByResultTitle = new Map<string, PageInfo>()
      const duplicateTitles: string[] = []
      const outputFiles = (await glob(path.join(this.contentRoot, "**/*.html"))).sort()
      const sourceRoot = path.dirname(path.dirname(this.fileName))
      for (const outputFile of outputFiles) {
        const url = path.relative(this.contentRoot, outputFile)
        const sourceFile = path.resolve(sourceRoot, url)
        if (!fs.existsSync(sourceFile)) {
          continue
        }
        const pageContext = context.clone() as HtmlRR0Context
        this.prepareContext?.(pageContext, outputFile)
        const html = fs.readFileSync(outputFile, this.encoding)
        const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)
        const outputTitle = titleMatch ? this.decodeTitle(titleMatch[1]) : ""
        const title = this.readSourceTitle(sourceFile) || outputTitle
        const pageInfo = this.searchCommand.pageInfoFrom(title, url.split(path.sep).join("/"), pageContext)
        if (pageInfo) {
          const resultTitle = SearchVisitor.resultTitle(pageInfo)
          const titleIndexed = pagesByResultTitle.get(resultTitle)
          if (titleIndexed && titleIndexed.url !== pageInfo.url) {
            duplicateTitles.push(
              `Search result "${resultTitle}" with URL ${pageInfo.url} is already indexed with URL ${titleIndexed.url}`)
            continue
          }
          pagesByUrl.set(pageInfo.url, pageInfo)
          pagesByResultTitle.set(resultTitle, pageInfo)
        }
      }
      if (duplicateTitles.length > 0) {
        throw new Error(`${duplicateTitles.length} indistinguishable search results:\n${duplicateTitles.join("\n")}`)
      }
      const pages = Array.from(pagesByUrl.values())
      pages.sort((pageInfo1, pageInfo2) => pageInfo1.title.localeCompare(pageInfo2.title))
      existingIndex = {pages, words: newIndex.words}
    } else try {
      existingIndex = JSON.parse(fs.readFileSync(this.fileName, {encoding: this.encoding}))
      const newPages = newIndex.pages
      const contentRoot = path.dirname(path.dirname(this.fileName))
      const pagesByUrl = new Map(
        existingIndex.pages
          .filter(page => fs.existsSync(path.resolve(contentRoot, page.url)))
          .map(page => [page.url, page])
      )
      for (const newPage of newPages) {
        pagesByUrl.set(newPage.url, newPage)
      }
      existingIndex.pages = Array.from(pagesByUrl.values())
      existingIndex.pages.sort(
        (pageInfo1, pageInfo2) => pageInfo1.title > pageInfo2.title ? 1 : pageInfo1.title < pageInfo2.title ? -1 : 0)
    } catch (e) {
      if (e.errno !== -2) {
        throw e
      }
      context.warn("Could not find", this.fileName, "Will create it")
      existingIndex = newIndex
    }
    const indexSize = existingIndex.pages.length
    context.setVar("indexSize", indexSize)
    context.log("Saving search index of", indexSize, "pages at", this.fileName)
    const indexJson = JSON.stringify(existingIndex)
    return writeFile(this.fileName, indexJson, "utf-8")
  }

  protected decodeTitle(title: string): string {
    return title
      .replace(/<[^>]+>/g, "")
      .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)))
      .replace(/&#x([\da-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, "\"")
      .replace(/&apos;|&#39;/gi, "'")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/\s+/g, " ")
      .trim()
  }

  protected readSourceTitle(sourceFile: string): string {
    const source = fs.readFileSync(sourceFile, this.encoding)
    const htmlTitleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(source)
    if (htmlTitleMatch) {
      return this.decodeTitle(htmlTitleMatch[1])
    }
    for (const directiveMatch of source.matchAll(/<!--#set\s+([\s\S]*?)-->/gi)) {
      const attributes = directiveMatch[1]
      if (!/\bvar\s*=\s*(["'])title\1/i.test(attributes)) {
        continue
      }
      const valueMatch = /\bvalue\s*=\s*(["'])([\s\S]*?)\1/i.exec(attributes)
      if (valueMatch) {
        return this.decodeTitle(valueMatch[2])
      }
    }
    return ""
  }
}
