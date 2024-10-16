import path from "path"
import { HtmlRR0SsgContext, RR0SsgContext, RR0SsgContextImpl } from "../RR0SsgContext.js"
import { TimeContext, TimeService, TimeServiceOptions } from "../time/index.js"
import { FileContents, HtmlFileContents, SsgConfig, SsgContext } from "ssg-api"
import { RR0EventFactory } from "../event/index.js"
import { AllDataService, TypedDataFactory } from "../data/index.js"
import { OrganizationFactory } from "../org/index.js"
import { CaseFactory } from "../science/index.js"
import { PeopleFactory } from "../people/index.js"
import { APIFactory } from "../tech/index.js"
import { TimeTestUtil } from "../time/TimeTestUtil"

export class RR0TestUtil {

  readonly outDir = "out"

  readonly config: SsgConfig = {
    getOutputPath(context: SsgContext): string {
      return path.join(this.outDir, context.file.name)
    }
  }

  readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  readonly dataService: AllDataService
  readonly caseFactory: CaseFactory

  readonly peopleFactory: PeopleFactory
  readonly time: TimeTestUtil

  constructor() {
    const eventFactory = new RR0EventFactory()
    const sightingFactory = new TypedDataFactory(eventFactory, "sighting", ["index"])
    const orgFactory = new OrganizationFactory(eventFactory)
    this.caseFactory = new CaseFactory(eventFactory)
    this.peopleFactory = new PeopleFactory(eventFactory)
    const apiFactory = new APIFactory(eventFactory)
    const bookFactory = new TypedDataFactory(eventFactory, "book")
    const articleFactory = new TypedDataFactory(eventFactory, "article")
    this.dataService = new AllDataService(
      [orgFactory, this.caseFactory, this.peopleFactory, bookFactory, articleFactory, sightingFactory, apiFactory])
    this.dataService.getFromDir("", ["people", "case"]).then(data => {
      //   console.debug(data)
    })
    this.time = new TimeTestUtil(this)
  }

  async getTimeService(options: TimeServiceOptions = this.time.timeOptions): Promise<TimeService> {
    return this.time.getTimeService(options)
  }

  newContext(inputFileName: string, contents?: string): RR0SsgContext {
    const outDir = "out"
    const config: SsgConfig = {
      getOutputPath(context: SsgContext): string {
        return path.join(outDir, context.file.name)
      }
    }
    const context = new RR0SsgContextImpl("fr", new TimeContext(), config)
    if (contents !== undefined && contents != null) {
      const langInfo = FileContents.getLang(inputFileName)
      context.file = new FileContents(inputFileName, "utf8", contents, new Date(), langInfo)
    } else {
      context.file = FileContents.read(inputFileName)
    }
    context.file = context.file  // By default
    return context
  }

  newHtmlContext(inputFileName: string, contents?: string): HtmlRR0SsgContext {
    const context = this.newContext(inputFileName, contents)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : undefined
    const currentFile = context.file
    context.file = new HtmlFileContents(currentFile.name, currentFile.encoding, currentFile.contents,
      currentFile.lastModified, currentFile.lang, {author: []}, {}, title)
    const htmlContext = context as HtmlRR0SsgContext
    Object.assign(htmlContext.time, TimeContext.fromFileName(htmlContext, inputFileName))
    return htmlContext
  }
}

export const rr0TestUtil = new RR0TestUtil()
