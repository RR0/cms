import fs from "fs"
import { ContentStep, ContentStepConfig, ContentStepResult, OutputFunc } from "ssg-api"
import { HtmlRR0Context } from "./RR0Context.js"
import { TimeService } from "./time/TimeService.js"

export interface ContentVisitor {
  visit(context: HtmlRR0Context): Promise<void>
}

export interface FileVisitor {
  visit(context: HtmlRR0Context, processFile: boolean): Promise<void>

  contentStepEnd(): Promise<void>
}

/**
 * A content config whose output is derived from more than the file being walked.
 *
 * The incremental rule this step inherits is "process the file if it is newer than its own output",
 * which is exact as long as the file IS the only input. It is not always: the Netlify redirects are
 * generated from `.htaccess` AND from a preamble holding everything Apache's directives cannot say
 * (see `CMSGenerator`'s `netlify.preambleFile`). Nothing declared that second half, so editing it
 * alone changed nothing — the output stayed at whatever the last `.htaccess` change had produced,
 * and the build reported success. That is the worst shape a staleness bug can take: silent, and
 * visible only to whoever reads the deployed file.
 *
 * Naming the dependency here rather than always reprocessing keeps the incremental build
 * incremental, and puts the statement where the config that needs it can be read.
 */
export interface ContentStepDependencies {
  /** Paths, as the working directory sees them, that this config's output also derives from. */
  alsoDerivedFrom?: string[]
}

export type RR0ContentStepConfig = ContentStepConfig & ContentStepDependencies

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
      || this.otherInputHasChanged(context, contentsConfig)
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

  /**
   * Whether a file this config's output ALSO derives from is newer than that output — see
   * `ContentStepDependencies`.
   *
   * A dependency that has gone missing counts as changed rather than as unchanged: an output built
   * from something no longer there should be rebuilt, and the rebuild is where that failure gets
   * reported (the preamble reader throws on a name it cannot find, deliberately). Answering "no"
   * would keep serving the stale output and say nothing.
   */
  private otherInputHasChanged(context: HtmlRR0Context, contentsConfig: ContentStepConfig): boolean {
    const dependencies = (contentsConfig as RR0ContentStepConfig).alsoDerivedFrom
    if (!dependencies?.length) {
      return false
    }
    const outputPath = contentsConfig.getOutputPath(context)
    if (!fs.existsSync(outputPath)) {
      return true
    }
    const outputTime = fs.statSync(outputPath).mtime.getTime()
    return dependencies.some(
      dependency => !fs.existsSync(dependency) || fs.statSync(dependency).mtime.getTime() > outputTime)
  }

  protected async postExecute(result: ContentStepResult): Promise<ContentStepResult> {
    await super.postExecute(result)
    for (const fileVisitor of this.options.fileVisitors) {
      await fileVisitor.contentStepEnd()
    }
    return result
  }
}
