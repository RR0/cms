import { ContentStep, ContentStepConfig, ContentStepResult, OutputFunc } from "ssg-api"
import { HtmlRR0Context } from "./RR0Context.js"
import { Time } from "./time/index.js"
import { TimeContext } from "@rr0/time"

export interface ContentVisitor {
  visit(context: HtmlRR0Context): Promise<void>
}

export interface FileVisitor {
  visit(context: HtmlRR0Context, processFile: boolean): Promise<void>

  contentStepEnd(): Promise<void>
}

export class RR0ContentStep extends ContentStep<HtmlRR0Context> {

  constructor(
    contentConfigs: ContentStepConfig[], outputFunc: OutputFunc, protected fileVisitors: FileVisitor[] = [],
    protected contentVisitors: ContentVisitor[] = [], protected force: boolean, name: string,
    protected toProcess: Set<string>) {
    super(contentConfigs, outputFunc, name)
  }

  static setTimeFromPath(context: HtmlRR0Context, filePath: string): TimeContext | undefined {
    const time = context.time
    time.reset()
    const newTimeContext = Time.contextFromFileName(context, filePath)
    if (newTimeContext) {
      time.setYear(newTimeContext.getYear())
      time.setMonth(newTimeContext.getMonth())
      time.setDayOfMonth(newTimeContext.getDayOfMonth())
      // context.time.from = context.time
    }
    return newTimeContext
  }

  protected async processFile(context: HtmlRR0Context, filePath: string,
                              contentsConfig: ContentStepConfig): Promise<string | undefined> {
    this.setContextFromFile(context, filePath)
    return super.processFile(context, filePath, contentsConfig)
  }

  protected setContextFromFile(context: HtmlRR0Context, filePath: string) {
    this.setTimeFromPath(context, filePath)
  }

  protected setTimeFromPath(context: HtmlRR0Context, filePath: string) {
    context.time.reset()  // Don't use time context from previous page.
    RR0ContentStep.setTimeFromPath(context, filePath)
  }

  protected async shouldProcessFile(context: HtmlRR0Context, contentsConfig: ContentStepConfig): Promise<boolean> {
    const fileHasChanged = await super.shouldProcessFile(context, contentsConfig)
    const fileIsForced = this.toProcess.has(context.file.name)
    const processFile = this.force || fileIsForced || fileHasChanged
    if (processFile) {
      this.toProcess.add(context.file.name)
    }
    for (const fileVisitor of this.fileVisitors) {
      await fileVisitor.visit(context, processFile)
    }
    return processFile
  }

  protected async shouldProcessContent(context: HtmlRR0Context,
                                       contentsConfig: ContentStepConfig): Promise<boolean> {
    const fileIsForced = this.toProcess.has(context.file.name)
    const showProcess = await super.shouldProcessContent(context, contentsConfig)
    const should = this.force || fileIsForced || showProcess
    if (should) {
      for (const contentVisitor of this.contentVisitors) {
        await contentVisitor.visit(context)
      }
    }
    return should
  }

  protected async postExecute(result: ContentStepResult): Promise<ContentStepResult> {
    await super.postExecute(result)
    for (const fileVisitor of this.fileVisitors) {
      await fileVisitor.contentStepEnd()
    }
    return result
  }
}
