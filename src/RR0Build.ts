import path from "path"
import fs from "fs"
import {
  CaseSummaryRenderer,
  ChronologyReplacerActions,
  ChronologyReplacerFactory,
  CsvMapper,
  EventReplacer,
  EventReplacerFactory,
  HttpSource,
  RR0Mapping,
  SsiTitleReplaceCommand,
  Time,
  TimeElementFactory,
  TimeLinkDefaultHandler,
  TimeReplacer,
  TimeReplacerFactory,
  TimeService,
  TimeServiceOptions,
  TimeTextBuilder,
  TimeUrlBuilder
} from "./time"
import { CaseDirectoryStep, CaseFactory, CaseService } from "./science/index.js"
import { GooglePlaceService, PlaceReplacerFactory } from "./place/index.js"
import { OrganizationFactory, OrganizationService } from "./org/index.js"
import { HtmlRR0Context, RR0ContextImpl } from "./RR0Context.js"
import { HtmlTable } from "./util/index.js"
import {
  AngularExpressionReplaceCommand,
  ClassDomReplaceCommand,
  ContentStepConfig,
  CopyStep,
  DomReplaceCommand,
  FileCopyConfig,
  FileWriteConfig,
  HtAccessToNetlifyConfigReplaceCommand,
  HtmlLinks,
  HtmlMeta,
  HtmlSsgContext,
  OutputFunc,
  Ssg,
  SsgContext,
  SsiEchoVarReplaceCommand,
  SsiIfReplaceCommand,
  SsiIncludeReplaceCommand,
  SsiIncludeReplaceCommandTransformer,
  SsiLastModifiedReplaceCommand,
  SsiSetVarReplaceCommand,
  StringEchoVarReplaceCommand
} from "ssg-api"
import { LanguageReplaceCommand } from "./lang/index.js"
import {
  AuthorReplaceCommand,
  PeopleDirectoryStepFactory,
  PeopleDirectoryStepOptions,
  PeopleFactory,
  PeopleReplacerFactory,
  PeopleService,
  WitnessReplacerFactory
} from "./people"
import {
  PersistentSourceRegistry,
  SourceFileCounter,
  SourceIndexStep,
  SourceRenderer,
  SourceReplacer,
  SourceReplacerFactory
} from "./source"
import { NoteFileCounter, NoteRenderer, NoteReplacer, NoteReplacerFactory } from "./note/index.js"
import { AnchorReplaceCommand, CaseAnchorHandler, DataAnchorHandler } from "./anchor/index.js"
import { MetaLinkReplaceCommand } from "./MetaLinkReplaceCommand.js"
import { OutlineReplaceCommand } from "./outline/index.js"
import { ImageCommand } from "./ImageCommand.js"
import { SearchIndexStep, SearchVisitor } from "./search/index.js"
import { BaseReplaceCommand } from "./BaseReplaceCommand.js"
import { OpenGraphCommand } from "./OpenGraphCommand.js"
import { DescriptionReplaceCommand } from "./DescriptionReplaceCommand.js"
import { BookContentVisitor, BookDirectoryStep } from "./book/index.js"
import { IndexedReplacerFactory } from "./index/IndexedReplacerFactory.js"
import { APIFactory, CodeReplacerFactory } from "./tech/index.js"
import { ContentVisitor, RR0ContentStep } from "./RR0ContentStep.js"
import { UnitReplaceCommand } from "./value/index.js"
import { DefaultContentVisitor } from "./DefaultContentVisitor.js"

import { rr0DefaultCopyright } from "./RR0DefaultCopyright.js"
import { TimeContext } from "@rr0/time"
import { FileContents, writeFile } from "@javarome/fileutil"
import { AllDataService, RR0EventFactory, TypedDataFactory } from "@rr0/data"

export interface RR0BuildOptions {
  contentRoots: string[]
  copies: string[]
  outDir: string
  locale: string,
  googleMapsApiKey: string
  mail: string
  timeOptions: TimeServiceOptions
  siteBaseUrl: string
  timeFormat: Intl.DateTimeFormatOptions
  timeFiles: string[],
  directoryPages: string[]
  ufoCaseDirectoryFile: string
  ufoCasesExclusions: string[],
  sourceRegistryFileName: string
  directoryExcluded: string[],
  directoryOptions: PeopleDirectoryStepOptions
  inDir?: (path: string) => string
}

export interface RR0BuildArgs {
  /**
   * Configuration file name.
   */
  config?: string

  /**
   * If the search index must be regenerated or not.
   * For ex: "pages,sources"
   */
  reindex?: string[]

  /**
   * Comma-separated list of file patterns to parse as contents.
   */
  contents?: string[]

  /**
   * Comma-separated list of file patterns to copy to out dir.
   */
  copies?: string[]

  /**
   * Comma-separated list of file patterns to books to generate TOCs for.
   */
  books?: string

  /**
   * Force re-generation even if file has not changed.
   */
  force?: string
}

const outputFunc: OutputFunc
  = async (context: HtmlSsgContext, outFile: FileContents): Promise<void> => {
  try {
    context.file.contents = context.file.serialize()
    context.log("Writing", outFile.name)
    await outFile.write()
    context.file.contents = outFile.contents
  } catch (e) {
    context.error(outFile.name, e)
  }
}

export class RR0Build {

  config: FileWriteConfig
  private context: RR0ContextImpl
  private placeService: GooglePlaceService
  private orgService: OrganizationService<any>
  private timeService: TimeService
  private caseFactory: CaseFactory
  private dataService: AllDataService
  private peopleFactory: PeopleFactory
  private timeTextBuilder: TimeTextBuilder

  constructor(protected options: RR0BuildOptions) {
    this.config = {
      getOutputPath(context: SsgContext): string {
        return path.join(options.outDir, context.file.name)
      }
    }
    const timeContext = new TimeContext()
    const context = this.context = new RR0ContextImpl(options.locale, timeContext, this.config)
    context.setVar("mapsApiKey", options.googleMapsApiKey)
    context.setVar("mail", options.mail)
    this.placeService = new GooglePlaceService("place", options.googleMapsApiKey)
    this.orgService = new OrganizationService([], "org", undefined)
    const timeTextBuilder = this.timeTextBuilder = new TimeTextBuilder(options.timeFormat)
    const timeOptions = options.timeOptions
    const timeRoot = this.options.inDir(timeOptions.root)
    const timeUrlBuilder = new TimeUrlBuilder({rootDir: timeRoot})
    const eventFactory = new RR0EventFactory()
    const sightingFactory = new TypedDataFactory(eventFactory, "sighting", ["index"])
    const orgFactory = new OrganizationFactory(eventFactory)
    const caseFactory = this.caseFactory = new CaseFactory(eventFactory)
    const peopleFactory = this.peopleFactory = new PeopleFactory(eventFactory)
    const apiFactory = new APIFactory(eventFactory)
    const bookFactory = new TypedDataFactory(eventFactory, "book")
    const articleFactory = new TypedDataFactory(eventFactory, "article")
    const dataService = this.dataService = new AllDataService(
      [orgFactory, caseFactory, peopleFactory, bookFactory, articleFactory, sightingFactory, apiFactory])
    dataService.getFromDir("", ["people", "case"]).then(data => {
      console.debug(data)
    })
    this.timeService = new TimeService(dataService, timeTextBuilder, timeUrlBuilder, timeOptions)
  }

  async run(args: RR0BuildArgs) {
    const context = this.context
    const timeFiles = this.options.timeFiles
    context.setVar("timeFilesCount", timeFiles.length)
    const timeService = this.timeService
    const timeElementFactory = new TimeElementFactory(timeService.renderer)
    const timeReplacer = new TimeReplacer(timeElementFactory)

    const caseFiles = await this.caseFactory.getFiles()
    let dataService = this.dataService
    const caseService = new CaseService(dataService, this.caseFactory, timeElementFactory, caseFiles)

    const peopleFiles = await this.peopleFactory.getFiles()
    const peopleService = new PeopleService(dataService, this.peopleFactory, peopleFiles)
    const peopleList = await peopleService.getAll()
    context.setVar("peopleFilesCount", peopleList.length)
    const bookMeta = new Map<string, HtmlMeta>()
    const bookLinks = new Map<string, HtmlLinks>()
    const config = this.config
    const ufoCaseDirectoryFile = this.options.inDir(this.options.ufoCaseDirectoryFile)
    const ufoCasesExclusions = this.options.ufoCasesExclusions.map(this.options.inDir)
    const ufoCasesStep = new CaseDirectoryStep(caseService, caseService.files, ufoCasesExclusions,
      ufoCaseDirectoryFile,
      outputFunc, config)
    const peopleDirectoryFactory = new PeopleDirectoryStepFactory(outputFunc, config, peopleService,
      this.options.directoryExcluded)
    const directoryOptions = this.options.directoryOptions
    for (const directoryOption in directoryOptions) {
      directoryOptions[directoryOption] = this.options.inDir(directoryOptions[directoryOption])
    }
    const peopleSteps = await peopleDirectoryFactory.create(directoryOptions)
    // Publish case.json files so that vraiufo.com will find them
    const copies = this.options.copies
    copies.push(...(ufoCasesStep.config.rootDirs).map(dir => path.join(dir, "case.json")))
    const outDir = this.options.outDir
    await writeFile(path.join(outDir, "casesDirs.json"), JSON.stringify(ufoCasesStep.config.rootDirs), "utf-8")
    copies.push(...(peopleSteps.reduce((rootDirs, peopleStep) => {
      rootDirs.push(...peopleStep.config.rootDirs)
      return rootDirs
    }, [])).map(dir => path.join(dir, "people.json")))
    await writeFile(path.join(outDir, "peopleDirs.json"),
      JSON.stringify(peopleList.map(people => people.dirName)), "utf-8")

    const timeTextBuilder = this.timeTextBuilder
    const searchVisitor = new SearchVisitor(
      {notIndexedUrls: ["404.html", "Referencement.html"], indexWords: false}, timeTextBuilder
    )
    const sourceRenderer = new SourceRenderer(timeTextBuilder)
    const http = new HttpSource()
    const baseUrl = this.options.siteBaseUrl
    const timeFormat = this.options.timeFormat
    const sourceRegistryFileName = this.options.inDir(this.options.sourceRegistryFileName)
    const sourceFactory = new PersistentSourceRegistry(dataService, http, baseUrl, sourceRegistryFileName,
      timeFormat)
    const noteCounter = new NoteFileCounter()
    const noteRenderer = new NoteRenderer(noteCounter)
    const caseRenderer = new CaseSummaryRenderer(noteRenderer, sourceFactory, sourceRenderer, timeElementFactory)
    // const actions: ChronologyReplacerActions = {read: ["backup", "fetch"], write: ["backup", "pages"]}
    // const actions: ChronologyReplacerActions = {read: [], write: ["backup"]}
    const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
    const rr0Mapping = new RR0Mapping(actions)
    const databaseAggregationCommand = new DomReplaceCommand(".contents ul",
      new ChronologyReplacerFactory(timeService,
        [rr0Mapping /*new GeipanRR0Mapping(actions)
      /*, baseOvniFranceRR0Mapping, fuforaRR0Mapping, nuforcRR0Mapping, urecatRR0Mapping*/
        ], caseRenderer)
    )
    const timeDefaultHandler = (context: HtmlRR0Context): string | undefined => {
      let title: string | undefined
      title = Time.titleFromFile(context, context.file.name, timeTextBuilder)
      return title
    }
    const pageReplaceCommands = [
      new BaseReplaceCommand("/"),
      new LanguageReplaceCommand(),
      new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright]),
      new StringEchoVarReplaceCommand(),
      new AngularExpressionReplaceCommand(),
      new SsiIfReplaceCommand(),
      new SsiSetVarReplaceCommand("title", (_match: string, ...args: any[]) => `<title>${args[0]}</title>`),
      new SsiSetVarReplaceCommand("url",
        (_match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`),
      new SsiLastModifiedReplaceCommand(timeFormat),
      new SsiTitleReplaceCommand([timeDefaultHandler]),
      new DescriptionReplaceCommand("UFO data for french-reading people", "abstract"),
      new AuthorReplaceCommand(timeService)
    ]
    const sourceCounter = new SourceFileCounter()
    const sourceReplacer = new SourceReplacer(sourceRenderer, sourceFactory, sourceCounter)
    const sourceReplacerFactory = new SourceReplacerFactory(sourceReplacer)
    const noteReplacer = new NoteReplacer(noteRenderer)
    const noteReplacerFactory = new NoteReplacerFactory(noteReplacer)
    const eventReplacer = new EventReplacer(caseRenderer, dataService)
    const contentsReplaceCommand = [
      new ClassDomReplaceCommand(new EventReplacerFactory(eventReplacer), "event"),
      new ClassDomReplaceCommand(sourceReplacerFactory, "source"),
      new DomReplaceCommand("time", new TimeReplacerFactory(timeReplacer)),
      new DomReplaceCommand("code", new CodeReplacerFactory()),
      new ClassDomReplaceCommand(new PeopleReplacerFactory(peopleService), "people"),
      new ClassDomReplaceCommand(new PlaceReplacerFactory(), "place"),
      new ClassDomReplaceCommand(new WitnessReplacerFactory(), "temoin", "temoin1", "temoin2", "temoin3"),
      new ClassDomReplaceCommand(noteReplacerFactory, "note"),
      new ClassDomReplaceCommand(new IndexedReplacerFactory(), "indexed"),
      new UnitReplaceCommand(),
      new MetaLinkReplaceCommand(new TimeLinkDefaultHandler(timeService, timeTextBuilder)),
      databaseAggregationCommand
    ]
    const ssg = new Ssg(config)
    const getOutputPath = (context: SsgContext): string => path.join(outDir, context.file.name)
    const force = args.force === "true"
    const toProcess = new Set<string>(this.options.directoryPages)
    const csvTransformer = new class implements SsiIncludeReplaceCommandTransformer {
      transform(context: SsgContext, file: FileContents): string | undefined {
        const fileName = file.name
        if (!fileName.endsWith(".csv")) {
          return undefined
        }
        const csv = fs.readFileSync(fileName, {encoding: "utf-8"})
        const headers = []
        const obj: any[] = new CsvMapper().parse(csv, headers)
        return HtmlTable.create(obj, headers)
      }
    }()

    const htAccessToNetlifyConfig: ContentStepConfig = {
      replacements: [new HtAccessToNetlifyConfigReplaceCommand(baseUrl)],
      roots: [".htaccess"],
      getOutputPath(_context: SsgContext): string {
        return path.join(outDir, "netlify.toml")
      }
    }
    const options = this.options
    const contentRoots = options.contentRoots.map(options.inDir)
    const includeStep = new RR0ContentStep(
      [htAccessToNetlifyConfig, {
        roots: contentRoots,
        replacements: [new class extends SsiIncludeReplaceCommand {
          protected filePath(context: SsgContext, fileNameArg: string): string {
            const dirName = path.dirname(context.file.name)
            const filePath = fileNameArg.startsWith("/") ? options.inDir(fileNameArg) : path.join(dirName, fileNameArg)
            return filePath
          }
        }([csvTransformer])],
        getOutputPath
      }],
      outputFunc, [], [], force, "content includes", toProcess
    )
    ssg.add(includeStep)
    ssg.add(ufoCasesStep)
    ssg.add(...peopleSteps)
    if (contentRoots) {
      const contentVisitor = new DefaultContentVisitor(dataService, caseRenderer as any, timeElementFactory)
      const contentVisitors: ContentVisitor[] = [contentVisitor, searchVisitor]
      if (args.books) {
        contentVisitors.push(new BookContentVisitor(bookMeta, bookLinks))
      }
      const contentReplacements = [
        ...pageReplaceCommands,
        ...contentsReplaceCommand,
        new OutlineReplaceCommand(),
        new AnchorReplaceCommand(baseUrl,
          [new CaseAnchorHandler(caseService, timeTextBuilder), new DataAnchorHandler(dataService)]),
        new ImageCommand(outDir, 275, 500),
        new OpenGraphCommand(outDir, timeFiles, baseUrl, timeTextBuilder)
      ]
      ssg.add(new RR0ContentStep([{roots: contentRoots, replacements: contentReplacements, getOutputPath}],
        outputFunc, [], contentVisitors, force, "contents replacements", toProcess))
    }
    if (args.books) {
      ssg.add(await BookDirectoryStep.create(outputFunc, config, bookMeta, bookLinks))
    }
    const reindex = args.reindex
    if (reindex?.includes("search")) {
      ssg.add(new SearchIndexStep("search/index.json", searchVisitor))
    }
    if (reindex?.includes("sources")) {
      ssg.add(new SourceIndexStep(sourceRegistryFileName, sourceFactory))
    }
    if (copies) {
      const copyConfig: FileCopyConfig = {
        getOutputPath,
        sourcePatterns: copies.map(this.options.inDir),
        options: {ignore: ["node_modules/**", "out/**"].map(this.options.inDir)}
      }
      ssg.add(new CopyStep(copyConfig))
    }
    try {
      const result = await ssg.start(context)
      context.log("Completed", result)
    } catch (err) {
      try {
        context.error(err, context.file.name)
      } catch (e) {
        context.error(err)
      }
    } finally {
      console.timeEnd("ssg")
    }
  }
}
