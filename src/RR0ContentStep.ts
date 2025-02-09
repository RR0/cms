import { ContentStep, ContentStepConfig, ContentStepResult, OutputFunc } from "ssg-api"
import { HtmlRR0Context } from "./RR0Context.js"
import { TimeService } from "./time/index.js"

export interface ContentVisitor {
  visit(context: HtmlRR0Context): Promise<void>
}

export interface FileVisitor {
  visit(context: HtmlRR0Context, processFile: boolean): Promise<void>

  contentStepEnd(): Promise<void>
}

export interface RR0ContentStepOptions {
  contentConfigs: ContentStepConfig[]
  outputFunc: OutputFunc
  fileVisitors?: FileVisitor[]
  contentVisitors?: ContentVisitor[]
  force: boolean
  name: string
  toProcess: Set<string>
}

export class RR0ContentStep extends ContentStep<HtmlRR0Context> {

  protected timeService: TimeService

  constructor(protected options: RR0ContentStepOptions, timeService: TimeService) {
    super(options.contentConfigs, options.outputFunc, options.name)
    this.timeService = timeService
    this.options.fileVisitors = options.fileVisitors || []
    this.options.contentVisitors = options.contentVisitors || []
  }

  protected async processFile(context: HtmlRR0Context, filePath: string,
                              contentsConfig: ContentStepConfig): Promise<string | undefined> {
    this.timeService.setContextFromFile(context, filePath)
    return super.processFile(context, filePath, contentsConfig)
  }

  protected async shouldProcessFile(context: HtmlRR0Context, contentsConfig: ContentStepConfig): Promise<boolean> {
    const fileHasChanged = await super.shouldProcessFile(context, contentsConfig)
    const fileIsForced = this.options.toProcess.has(context.file.name)
    const processFile = this.options.force || fileIsForced || fileHasChanged
    if (processFile) {
      this.options.toProcess.add(context.file.name)
    }
    for (const fileVisitor of this.options.fileVisitors) {
      await fileVisitor.visit(context, processFile)
    }
    return processFile
  }

  protected async shouldProcessContent(context: HtmlRR0Context,
                                       contentsConfig: ContentStepConfig): Promise<boolean> {
    const fileIsForced = this.options.toProcess.has(context.file.name)
    const showProcess = await super.shouldProcessContent(context, contentsConfig)
    const should = this.options.force || fileIsForced || showProcess
    if (should) {
      for (const contentVisitor of this.options.contentVisitors) {
        await contentVisitor.visit(context)
      }
    }
    return should
  }

  protected async postExecute(result: ContentStepResult): Promise<ContentStepResult> {
    await super.postExecute(result)
    for (const fileVisitor of this.options.fileVisitors) {
      await fileVisitor.contentStepEnd()
    }
    return result
  }
}
