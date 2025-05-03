import path from "path"
import fs from "fs"
import {
  CaseSummaryRenderer,
  ChronologyReplacerFactory,
  CsvMapper,
  EventReplacer,
  EventReplacerFactory,
  HttpSource,
  RR0CaseMapping,
  SsiTitleReplaceCommand,
  TimeElementFactory,
  TimeLinkDefaultHandler,
  TimeRenderer,
  TimeReplacer,
  TimeReplacerFactory,
  TimeService,
  TimeTextBuilder,
  TimeUrlBuilder
} from "./time/index.js"
import { CaseDirectoryStep, CaseFactory, CaseService } from "./science/crypto/ufo/enquete/dossier/index.js"
import {
  cities,
  CityService,
  CmsOrganizationFactory,
  countries,
  departments,
  DepartmentService,
  OrganizationService,
  regions,
  RegionService
} from "./org/index.js"
import { HtmlRR0Context, RR0ContextImpl } from "./RR0Context.js"
import { HtmlTable } from "./util/index.js"
import {
  ClassDomReplaceCommand,
  ContentStepConfig,
  CopyStep,
  DomReplaceCommand,
  FileCopyConfig,
  FileWriteConfig,
  HtAccessToNetlifyConfigReplaceCommand,
  HtmlFileContents,
  HtmlLinks,
  HtmlMeta,
  HtmlSsgContext,
  OutputFunc,
  ReplaceCommand,
  Ssg,
  SsgContext,
  SsiIncludeReplaceCommand,
  SsiIncludeReplaceCommandTransformer
} from "ssg-api"
import {
  AuthorReplaceCommand,
  PeopleDirectoryStepFactory,
  PeopleDirectoryStepOptions,
  PeopleReplacerFactory
} from "./people/index.js"
import {
  PersistentSourceRegistry,
  SourceFileCounter,
  SourceIndexStep,
  SourceRenderer,
  SourceReplacer,
  SourceReplacerFactory
} from "./source/index.js"
import { NoteFileCounter, NoteRenderer, NoteReplacer, NoteReplacerFactory } from "./note/index.js"
import { AnchorReplaceCommand, CaseAnchorHandler, DataAnchorHandler } from "./anchor/index.js"
import { MetaLinkReplaceCommand } from "./MetaLinkReplaceCommand.js"
import { OutlineReplaceCommand } from "./outline/index.js"
import { ImageCommand } from "./ImageCommand.js"
import { SearchIndexStep, SearchVisitor } from "./search/index.js"
import { OpenGraphCommand } from "./OpenGraphCommand.js"
import { BookContentVisitor, BookDirectoryStep } from "./book/index.js"
import { APIFactory } from "./tech/index.js"
import { ContentVisitor, RR0ContentStep, RR0ContentStepOptions } from "./RR0ContentStep.js"
import { DataContentVisitor } from "./DataContentVisitor.js"
import { FileContents, writeFile } from "@javarome/fileutil"
import {
  AllDataService,
  EventDataFactory,
  PeopleFactory,
  PeopleService,
  RR0EventFactory,
  TypedDataFactory
} from "@rr0/data"
import { GooglePlaceService } from "@rr0/place"
import { PeopleHtmlRenderer } from "./people/PeopleHtmlRenderer.js"
import { CountryService } from "./org/country/CountryService.js"
import { CMSContext } from "./CMSContext.js"
import { TimeOptions } from "./time/TimeOptions.js"
import { DataOptions } from "./DataOptions.js"
import { TimeContext } from "./time/TimeContext.mjs"

export interface CMSGeneratorOptions {
  contentRoots: string[]
  copies: string[]
  outDir: string
  locale: string,
  googleMapsApiKey: string
  mail: string
  dataOptions: {
    time: TimeOptions
    org: DataOptions
  }
  siteBaseUrl: string
  timeFormat: Intl.DateTimeFormatOptions
  directoryPages: string[]
  ufoCaseDirectoryFile: string
  ufoCasesExclusions: string[],
  sourceRegistryFileName: string
  directoryExcluded: string[],
  directoryOptions: PeopleDirectoryStepOptions
  mappings: RR0CaseMapping<any>[]
  contentReplacers?: ReplaceCommand<HtmlRR0Context>[]
}

export interface CMSGenerationOptions {
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
    if (context.file instanceof HtmlFileContents) {
      context.file.contents = context.file.serialize()
    }
    context.log("Writing", outFile.name)
    await outFile.write()
    context.file.contents = outFile.contents
  } catch (e) {
    context.error(outFile.name, e)
  }
}

export class CMSGenerator implements CMSContext {

  readonly config: FileWriteConfig
  readonly context: RR0ContextImpl
  readonly placeService: GooglePlaceService
  readonly orgService: OrganizationService
  readonly caseFactory: CaseFactory
  readonly dataService: AllDataService
  readonly peopleFactory: PeopleFactory
  readonly cityService: CityService
  readonly departmentService: DepartmentService
  readonly countryService: CountryService
  readonly timeTextBuilder: TimeTextBuilder
  readonly timeService: TimeService
  readonly timeRenderer: TimeRenderer
  readonly timeUrlBuilder: TimeUrlBuilder
  readonly http = new HttpSource()

  constructor(protected options: CMSGeneratorOptions) {
    this.config = {
      getOutputPath(context: SsgContext): string {
        return path.join(options.outDir, context.file.name)
      }
    }
    const eventFactory = new RR0EventFactory()
    const orgFactory = new CmsOrganizationFactory(eventFactory)
    const orgConfig: DataOptions = options.dataOptions.org
    const sightingFactory = new EventDataFactory(eventFactory, ["sighting"], ["index"])
    const caseFactory = this.caseFactory = new CaseFactory(eventFactory)
    const peopleFactory = this.peopleFactory = new PeopleFactory(eventFactory)
    const apiFactory = new APIFactory(eventFactory)
    const bookFactory = new TypedDataFactory(eventFactory, "book")
    const articleFactory = new TypedDataFactory(eventFactory, "article")
    const factories = [orgFactory, caseFactory, peopleFactory, bookFactory, articleFactory, sightingFactory, apiFactory]
    const dataService = this.dataService = new AllDataService(factories)
    dataService.getFromDir("", ["people", "case"]).then(data => {
      console.debug(data)
    })

    this.orgService = new OrganizationService(dataService, orgFactory, orgConfig, undefined, [])
    const countryService = this.countryService = new CountryService(dataService, orgFactory, orgConfig, undefined,
      countries)
    const regionService = new RegionService(dataService, orgFactory, orgConfig, countryService, regions)
    const departmentService = this.departmentService = new DepartmentService(dataService, orgFactory, orgConfig,
      regionService, departments)
    const cityService = new CityService(dataService, orgFactory, orgConfig, departmentService, cities)
    this.placeService = new GooglePlaceService("place", options.googleMapsApiKey)
    this.cityService = cityService

    const timeTextBuilder = this.timeTextBuilder = new TimeTextBuilder(options.timeFormat)
    const timeOptions = options.dataOptions.time
    const timeUrlBuilder = this.timeUrlBuilder = new TimeUrlBuilder(timeOptions)
    this.timeRenderer = new TimeRenderer(timeUrlBuilder, timeTextBuilder)
    this.timeService = new TimeService(dataService, timeOptions)
  }

  async generate(args: CMSGenerationOptions) {
    const timeContext = new TimeContext()
    const context = new RR0ContextImpl(this.options.locale, timeContext, this.config, undefined, undefined, undefined,
      this)
    context.setVar("mapsApiKey", this.options.googleMapsApiKey)
    context.setVar("mail", this.options.mail)
    const config = this.config
    const copies = this.options.copies
    const outDir = this.options.outDir
    const force = args.force === "true"

    const ssg = new Ssg(config)

    const dataService = this.dataService
    const timeService = this.timeService
    const timeRenderer = this.timeRenderer

    const timeFormat = this.options.timeFormat
    const {timeFiles, timeElementFactory, timeReplacer} = this.setupTime(context)

    const orgFactory = dataService.factories.find(f => f.type === "org")
    if (orgFactory) {
      const orgFiles = this.options.dataOptions.org.files
      context.setVar("orgFilesCount", orgFiles.length)
    }
    const placeFactory = dataService.factories.find(f => f.type === "place")
    if (placeFactory) {
      const placeFiles = await placeFactory.getFiles()
      context.setVar("placeFilesCount", placeFiles.length)
    }
    const {caseService, ufoCasesStep} = await this.setupCases(timeElementFactory)

    const peopleRenderer = new PeopleHtmlRenderer()
    const {peopleService, peopleSteps} = await this.setupPeople(context, peopleRenderer, this.options.copies)

    const timeTextBuilder = this.timeTextBuilder

    const searchVisitor = new SearchVisitor(
      {notIndexedUrls: ["404.html", "Referencement.html"], indexWords: false}, timeTextBuilder
    )
    const {sourceRenderer, sourceFactory, sourceReplacerFactory} = this.setupSources(timeTextBuilder, timeFormat)

    const {noteRenderer, noteReplacerFactory} = this.setupNotes()

    const caseRenderer = new CaseSummaryRenderer(noteRenderer, sourceFactory, sourceRenderer, timeElementFactory)

    const mappings = this.options.mappings || []
    mappings.forEach(mapping => mapping.init(this))
    const timeUrlBuilder = this.timeUrlBuilder
    const databaseAggregationCommand = new DomReplaceCommand(".contents ul",
      new ChronologyReplacerFactory(timeUrlBuilder, mappings, caseRenderer)
    )
    const eventReplacer = new EventReplacer(caseRenderer, dataService)
    const getOutputPath = (context: SsgContext): string => path.join(outDir, context.file.name)
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
      replacements: [new HtAccessToNetlifyConfigReplaceCommand(this.options.siteBaseUrl)],
      roots: [".htaccess"],
      getOutputPath: (_context: SsgContext) => "netlify.toml"
    }
    const contentRoots = this.options.contentRoots
    const contentStepOptions: RR0ContentStepOptions = {
      contentConfigs: [htAccessToNetlifyConfig, {
        roots: contentRoots,
        replacements: [new class extends SsiIncludeReplaceCommand {
          protected filePath(context: SsgContext, fileNameArg: string): string {
            const dirName = path.dirname(context.file.name)
            return fileNameArg.startsWith("/") ? path.join(process.cwd(), fileNameArg) : path.join(dirName, fileNameArg)
          }
        }([csvTransformer])],
        getOutputPath
      }],
      outputFunc, fileVisitors: [], contentVisitors: [], force, name: "content includes", toProcess
    }
    const includeStep = new RR0ContentStep(contentStepOptions, timeService)
    ssg.add(includeStep)
    ssg.add(ufoCasesStep)
    ssg.add(...peopleSteps)
    if (contentRoots) {
      const dataContentVisitor = new DataContentVisitor(dataService, caseRenderer, timeElementFactory)
      const contentVisitors: ContentVisitor[] = [dataContentVisitor, searchVisitor]
      const timeDefaultHandler = (context: HtmlRR0Context): string | undefined => this.timeService.titleFromFile(
        context,
        context.file.name, this.timeTextBuilder)
      const pageReplaceCommands = [
        new SsiTitleReplaceCommand([timeDefaultHandler]),
        new AuthorReplaceCommand(timeRenderer),
        ...this.options.contentReplacers
      ]
      const contentsReplaceCommand = [
        new ClassDomReplaceCommand(new EventReplacerFactory(eventReplacer), "event"),
        new ClassDomReplaceCommand(sourceReplacerFactory, "source"),
        new DomReplaceCommand("time", new TimeReplacerFactory(timeReplacer, timeUrlBuilder)),
        new ClassDomReplaceCommand(new PeopleReplacerFactory(peopleService, peopleRenderer), "people"),
        new ClassDomReplaceCommand(noteReplacerFactory, "note"),
        new MetaLinkReplaceCommand(new TimeLinkDefaultHandler(timeService, timeUrlBuilder, timeTextBuilder)),
        databaseAggregationCommand
      ]
      const contentReplacements = [
        ...pageReplaceCommands,
        ...contentsReplaceCommand,
        new OutlineReplaceCommand(),
        new AnchorReplaceCommand(this.options.siteBaseUrl,
          [new CaseAnchorHandler(caseService, timeTextBuilder), new DataAnchorHandler(dataService)]),
        new ImageCommand(outDir, 275, 500),
        new OpenGraphCommand(outDir, timeFiles, this.options.siteBaseUrl, timeService, timeTextBuilder)
      ]
      ssg.add(new RR0ContentStep({
        contentConfigs: [{roots: contentRoots, replacements: contentReplacements, getOutputPath}],
        outputFunc, fileVisitors: [], contentVisitors, force, name: "contents replacements", toProcess
      }, timeService))
      if (args.books) {
        const bookMeta = new Map<string, HtmlMeta>()
        const bookLinks = new Map<string, HtmlLinks>()
        contentVisitors.push(new BookContentVisitor(bookMeta, bookLinks))
        ssg.add(await BookDirectoryStep.create(outputFunc, config, bookMeta, bookLinks))
      }
    }
    const reindex = args.reindex
    if (reindex?.includes("search")) {
      ssg.add(new SearchIndexStep("search/index.json", searchVisitor))
    }
    if (reindex?.includes("sources")) {
      ssg.add(new SourceIndexStep(this.options.sourceRegistryFileName, sourceFactory))
    }
    if (copies) {
      const copyConfig: FileCopyConfig = {
        getOutputPath,
        sourcePatterns: Array.from(new Set(copies)),
        options: {ignore: ["node_modules/**", "out/**"]}
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

  protected setupSources(timeTextBuilder: TimeTextBuilder, timeFormat: Intl.DateTimeFormatOptions) {
    const sourceRenderer = new SourceRenderer(timeTextBuilder)
    const sourceFactory = new PersistentSourceRegistry(this.dataService, this.http, this.options.siteBaseUrl,
      this.options.sourceRegistryFileName, timeFormat, this.timeService)
    const sourceCounter = new SourceFileCounter()
    const sourceReplacer = new SourceReplacer(sourceRenderer, sourceFactory, sourceCounter)
    const sourceReplacerFactory = new SourceReplacerFactory(sourceReplacer)
    return {sourceRenderer, sourceFactory, sourceReplacerFactory}
  }

  protected setupTime(context: RR0ContextImpl) {
    const timeFiles = this.options.dataOptions.time.files
    context.setVar("timeFilesCount", timeFiles.length)
    const timeElementFactory = new TimeElementFactory(this.timeRenderer)
    const timeReplacer = new TimeReplacer(timeElementFactory)
    return {timeFiles, timeElementFactory, timeReplacer}
  }

  protected async setupPeople(context: RR0ContextImpl, peopleRenderer: PeopleHtmlRenderer, copies: string[]) {
    const peopleFiles = await this.peopleFactory.getFiles()
    const peopleService = new PeopleService(this.dataService, this.peopleFactory,
      {files: peopleFiles, rootDir: "people"})
    const peopleList = await peopleService.getAll()
    context.setVar("peopleFilesCount", peopleFiles.length)
    const peopleDirectoryFactory = new PeopleDirectoryStepFactory(outputFunc, this.config, peopleService,
      peopleRenderer,
      this.options.directoryExcluded)
    const directoryOptions = this.options.directoryOptions
    for (const directoryOption in directoryOptions) {
      directoryOptions[directoryOption] = directoryOptions[directoryOption]
    }
    const peopleSteps = await peopleDirectoryFactory.create(directoryOptions)
    const dirsContainingPeopleJson = peopleSteps.reduce((rootDirs, peopleStep) => {
      rootDirs.push(...peopleStep.config.rootDirs)
      return rootDirs
    }, [])
    copies.push(...dirsContainingPeopleJson.map(dir => path.join(dir, "people.json")))
    await writeFile(path.join(this.options.outDir, "peopleDirs.json"),
      JSON.stringify(peopleList.map(people => people.dirName)), "utf-8")
    return {peopleService, peopleSteps, copies}
  }

  private setupNotes() {
    const noteCounter = new NoteFileCounter()
    const noteRenderer = new NoteRenderer(noteCounter)
    const noteReplacer = new NoteReplacer(noteRenderer)
    const noteReplacerFactory = new NoteReplacerFactory(noteReplacer)
    return {noteRenderer, noteReplacerFactory}
  }

  private async setupCases(timeElementFactory: TimeElementFactory) {
    const caseFiles = await this.caseFactory.getFiles()
    const caseService = new CaseService(this.dataService, this.caseFactory, timeElementFactory, caseFiles)
    const ufoCaseDirectoryFile = this.options.ufoCaseDirectoryFile
    const ufoCasesExclusions = this.options.ufoCasesExclusions
    const ufoCasesStep = new CaseDirectoryStep(caseService, caseService.files, ufoCasesExclusions,
      ufoCaseDirectoryFile, outputFunc, this.config)
    // Publish case.json files so that vraiufo.com will find them
    const ufoCasesRootDirs = ufoCasesStep.config.rootDirs
    this.options.copies.push(...ufoCasesRootDirs.map(dir => path.join(dir, "case.json")))
    await writeFile(path.join(this.options.outDir, "casesDirs.json"), JSON.stringify(ufoCasesRootDirs), "utf-8")
    return {caseService, ufoCasesStep}
  }
}
