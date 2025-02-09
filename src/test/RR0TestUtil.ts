import path from "path"
import { HtmlRR0Context, RR0Context, RR0ContextImpl } from "../RR0Context.js"
import { FileWriteConfig, HtmlFileContents, SsgContext } from "ssg-api"
import { OrganizationFactory } from "../org/index.js"
import { CaseFactory } from "../science/index.js"
import { PeopleFactory } from "../people/index.js"
import { APIFactory } from "../tech/index.js"
import { TimeTestUtil } from "../time/TimeTestUtil"
import { TimeContext } from "@rr0/time"
import { FileContents } from "@javarome/fileutil"
import { AllDataService, RR0EventFactory, TypedDataFactory } from "@rr0/data"

export class RR0TestUtil {

  readonly config: FileWriteConfig = {
    getOutputPath: (context: SsgContext): string => {
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

  constructor(readonly rootDir = "test", readonly outDir = "out") {
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

  newContext(inputFileName: string, contents?: string, locale = "fr"): RR0Context {
    const context = new RR0ContextImpl(locale, new TimeContext(), this.config)
    if (contents !== undefined && contents != null) {
      const langInfo = FileContents.getLang(inputFileName)
      context.file = new FileContents(inputFileName, "utf8", contents, new Date(), langInfo)
    } else {
      context.file = FileContents.read(inputFileName)
    }
    context.file = context.file  // By default
    return context
  }

  filePath(inputFileName: string): string {
    return path.join(this.rootDir, inputFileName)
  }

  newHtmlContext(inputFileName: string, contents?: string, locale = "fr"): HtmlRR0Context {
    const context = this.newContext(this.filePath(inputFileName), contents, locale)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : undefined
    const currentFile = context.file
    const lang = currentFile.lang
    context.file = new HtmlFileContents(currentFile.name, currentFile.encoding, currentFile.contents,
      currentFile.lastModified, lang, {author: []}, {}, title)
    const htmlContext = context as HtmlRR0Context
    const timeContext = this.time.getService().contextFromFileName(htmlContext, inputFileName)
    Object.assign(htmlContext.time, timeContext)
    return htmlContext
  }
}

export const rr0TestUtil = new RR0TestUtil()

export function testFilePath(filePath: string) {
  return path.join(rr0TestUtil.rootDir, filePath)
}
