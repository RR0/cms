import { DirectoryStep, DirectoryStepConfig, FileWriteConfig, OutputFunc } from "ssg-api"
import { HtmlRR0Context, RR0Context } from "./RR0Context.js"
import { StringUtil } from "./util/index.js"

/**
 * Builds a directory index.
 */
export class IndexDirectoryStep extends DirectoryStep {
  /**
   *
   * @param rootDirs The directories where UFO cases info can be found.
   * @param excludedDirs The directories to exclude from the UFO case directory search.
   * @param templateFileName The template of the directory page to build.
   * @param outputFunc
   * @param config
   */
  constructor(rootDirs: string[], excludedDirs: string[], templateFileName: string,
              protected outputFunc: OutputFunc, config: FileWriteConfig) {
    super({rootDirs, excludedDirs, templateFileName, getOutputPath: config.getOutputPath} as DirectoryStepConfig,
      "directory index")
  }

  /**
   * Convert an array of Case[] to an <ul> HTML unordered list.
   *
   * @param context
   * @param cases
   */
  protected toList(context: HtmlRR0Context, cases: any[]): HTMLUListElement {
    const listItems = cases.map(dirCase => {
      if (!dirCase.title) {
        const lastSlash = dirCase.dirName.lastIndexOf("/")
        const lastDir = dirCase.dirName.substring(lastSlash + 1)
        dirCase.title = StringUtil.camelToText(lastDir)
      }
      return this.toListItem(context, dirCase)
    })
    const ul = context.file.document.createElement("ul")
    ul.append(...listItems)
    ul.className = "links"
    return ul
  }

  /**
   * Convert a Case object to an HTML list item.
   *
   * @param context
   * @param dirCase
   */
  protected toListItem(context: HtmlRR0Context, dirCase: any): HTMLLIElement {
    const item = context.file.document.createElement("li")
    const ref = document.createElement("a")
    ref.href = dirCase.dirName + "/"
    item.appendChild(ref)
    return item
  }

  protected async processDirs(context: HtmlRR0Context, dirNames: string[]): Promise<void> {
    const cases = await this.scan(context, dirNames)
    const ul = this.toList(context, cases)
    const config = this.config as DirectoryStepConfig
    const outputPath = config.getOutputPath(context)
    const output = context.newOutput(outputPath)
    output.contents = context.file.contents.replace(`<!--#echo var="directories" -->`, ul.outerHTML)
    await this.outputFunc(context, output)
  }

  /**
   * Read case JSON files contents and instantiate them as Case objects.
   *
   * @param context
   * @param dirNames The directories to look for case.json files.
   */
  protected async scan(context: RR0Context, dirNames: string[]): Promise<any[]> {
    const cases: any[] = []
    for (const dirName of dirNames) {
      try {
        const dirCases = dirName
        cases.push(...dirCases)
      } catch (e) {
        context.warn(`${dirName} has no case.json description`)
        // No json, just guess title.
      }
    }
    return cases
  }
}
