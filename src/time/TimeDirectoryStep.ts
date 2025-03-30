import { DirectoryStep, DirectoryStepConfig, FileWriteConfig, OutputFunc } from "ssg-api"
import { TimeService } from "./TimeService.js"
import { HtmlRR0Context, RR0Context } from "../RR0Context.js"
import { StringUtil } from "../util/index.js"
import { RR0Event } from "@rr0/data"
import { TimeElementFactory } from "./html/index.js"

/**
 * Builds a directory page for UFO times.
 */
export class TimeDirectoryStep extends DirectoryStep {
  /**
   *
   * @param service
   * @param elementFactory
   * @param rootDirs The directories where UFO times info can be found.
   * @param excludedDirs The directories to exclude from the UFO time directory search.
   * @param templateFileName The template of the directory page to build.
   * @param outputFunc
   * @param config
   */
  constructor(protected service: TimeService, protected elementFactory: TimeElementFactory, rootDirs: string[],
              excludedDirs: string[], templateFileName: string,
              protected outputFunc: OutputFunc, config: FileWriteConfig) {
    super({rootDirs, excludedDirs, templateFileName, getOutputPath: config.getOutputPath} as DirectoryStepConfig,
      "time directory")
  }

  /**
   * Convert an array of Time[] to an <ul> HTML unordered list.
   *
   * @param context
   * @param events
   */
  protected toList(context: HtmlRR0Context, events: RR0Event[]): HTMLUListElement {
    const listItems = events.map(event => {
      if (!event.title) {
        const lastSlash = event.dirName.lastIndexOf("/")
        const lastDir = event.dirName.substring(lastSlash + 1)
        event.title = StringUtil.camelToText(lastDir)
      }
      return this.toListItem(context, event)
    })
    const ul = context.file.document.createElement("ul")
    ul.append(...listItems)
    ul.className = "links"
    return ul
  }

  /**
   * Convert a Time object to an HTML list item.
   *
   * @param context
   * @param event
   */
  protected toListItem(context: HtmlRR0Context, event: RR0Event): HTMLLIElement {
    const item = context.file.document.createElement("li")
    const eventContext = context.clone()
    this.service.setContextFromFile(eventContext, event.dirName)
    if (event.time) {
      eventContext.time.date = event.time
    }
    const ref = this.elementFactory.create(eventContext, context, {url: true, contentOnly: true})
    item.appendChild(ref)
    return item
  }

  protected async processDirs(context: HtmlRR0Context, dirNames: string[]): Promise<void> {
    const events = await this.scan(context, dirNames)
    const ul = this.toList(context, events)
    const config = this.config as DirectoryStepConfig
    const outputPath = config.getOutputPath(context)
    const output = context.newOutput(outputPath)
    output.contents = context.file.contents.replace(`<!--#echo var="directories" -->`, ul.outerHTML)
    await this.outputFunc(context, output)
  }

  /**
   * Read time JSON files contents and instantiate them as Time objects.
   *
   * @param context
   * @param dirNames The directories to look for time.json files.
   */
  protected async scan(context: RR0Context, dirNames: string[]): Promise<RR0Event[]> {
    const events: RR0Event[] = []
    for (const dirName of dirNames) {
      try {
        const dirEvents = await this.service.getFromDir(dirName)
        events.push(...dirEvents)
      } catch (e) {
        context.warn(`${dirName} has no event.json description`)
        // No json, just guess title.
      }
    }
    return events
  }
}
