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
  TimeOptions,
  TimeRenderer,
  TimeReplacer,
  TimeReplacerFactory,
  TimeService,
  TimeTextBuilder,
  TimeUrlBuilder
} from "./time"
import { CaseDirectoryStep, CaseFactory, CaseService } from "./science/index.js"
import { PlaceReplacerFactory } from "./place/index.js"
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
  Ssg,
  SsgContext,
  SsiIncludeReplaceCommand,
  SsiIncludeReplaceCommandTransformer
} from "ssg-api"
import {
  AuthorReplaceCommand,
  PeopleDirectoryStepFactory,
  PeopleDirectoryStepOptions,
  PeopleReplacerFactory,
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
import { OpenGraphCommand } from "./OpenGraphCommand.js"
import { BookContentVisitor, BookDirectoryStep } from "./book/index.js"
import { IndexedReplacerFactory } from "./index/IndexedReplacerFactory.js"
import { APIFactory, CodeReplacerFactory } from "./tech/index.js"
import { ContentVisitor, RR0ContentStep, RR0ContentStepOptions } from "./RR0ContentStep.js"
import { UnitReplaceCommand } from "./value/index.js"
import { DefaultContentVisitor } from "./DefaultContentVisitor.js"
import { TimeContext } from "@rr0/time"
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
import { PeopleHtmlRenderer } from "./people/PeopleHtmlRenderer"
import { CountryService } from "./org/country/CountryService"
import { BuildContext } from "./BuildContext"
import { ReplaceCommand } from "ssg-api/dist/src/step/content/replace"

export interface RR0BuildOptions {
  contentRoots: string[]
  copies: string[]
  outDir: string
  locale: string,
  googleMapsApiKey: string
  mail: string
  timeOptions: TimeOptions
  siteBaseUrl: string
  timeFormat: Intl.DateTimeFormatOptions
  directoryPages: string[]
  ufoCaseDirectoryFile: string
  ufoCasesExclusions: string[],
  sourceRegistryFileName: string
  directoryExcluded: string[],
  directoryOptions: PeopleDirectoryStepOptions
  mappings: RR0CaseMapping<any>[]
  contentReplacers: ReplaceCommand<HtmlRR0Context>[]
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

export class RR0Build implements BuildContext {

  readonly config: FileWriteConfig
  readonly context: RR0ContextImpl
  readonly placeService: GooglePlaceService
  readonly orgService: OrganizationService<any>
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
    const eventFactory = new RR0EventFactory()
    const orgFactory = new CmsOrganizationFactory(eventFactory)
    const countryService = this.countryService = new CountryService(countries, "org", orgFactory, undefined)
    const regionService = new RegionService(regions, "org", orgFactory, countryService)
    const departmentService = this.departmentService = new DepartmentService(departments, "org", orgFactory,
      regionService)
    const cityService = new CityService(cities, "org", orgFactory, departmentService)
    this.placeService = new GooglePlaceService("place", options.googleMapsApiKey)
    this.orgService = new OrganizationService([], "org", orgFactory, undefined)
    this.cityService = cityService
    const timeTextBuilder = this.timeTextBuilder = new TimeTextBuilder(options.timeFormat)
    const timeOptions = options.timeOptions
    const timeUrlBuilder = this.timeUrlBuilder = new TimeUrlBuilder(timeOptions)
    const sightingFactory = new EventDataFactory(eventFactory, "sighting", ["index"])
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
    this.timeRenderer = new TimeRenderer(timeUrlBuilder, timeTextBuilder)
    this.timeService = new TimeService(dataService, timeOptions)
  }

  async run(args: RR0BuildArgs) {
    const context = this.context
    const timeFiles = this.options.timeOptions.files
    context.setVar("timeFilesCount", timeFiles.length)
    const timeRenderer = this.timeRenderer
    const timeElementFactory = new TimeElementFactory(timeRenderer)
    const timeReplacer = new TimeReplacer(timeElementFactory)

    const caseFiles = await this.caseFactory.getFiles()
    let dataService = this.dataService
    const caseService = new CaseService(dataService, this.caseFactory, timeElementFactory, caseFiles)

    const peopleFiles = await this.peopleFactory.getFiles()
    const peopleService = new PeopleService(dataService, this.peopleFactory, {files: peopleFiles, rootDir: "people"})
    const peopleList = await peopleService.getAll()
    context.setVar("peopleFilesCount", peopleList.length)
    const bookMeta = new Map<string, HtmlMeta>()
    const bookLinks = new Map<string, HtmlLinks>()
    const config = this.config
    const ufoCaseDirectoryFile = this.options.ufoCaseDirectoryFile
    const ufoCasesExclusions = this.options.ufoCasesExclusions
    const ufoCasesStep = new CaseDirectoryStep(caseService, caseService.files, ufoCasesExclusions,
      ufoCaseDirectoryFile, outputFunc, config)
    const peopleRenderer = new PeopleHtmlRenderer()
    const peopleDirectoryFactory = new PeopleDirectoryStepFactory(outputFunc, config, peopleService, peopleRenderer,
      this.options.directoryExcluded)
    const directoryOptions = this.options.directoryOptions
    for (const directoryOption in directoryOptions) {
      directoryOptions[directoryOption] = directoryOptions[directoryOption]
    }
    const peopleSteps = await peopleDirectoryFactory.create(directoryOptions)
    // Publish case.json files so that vraiufo.com will find them
    const copies = this.options.copies
    const ufoCasesRootDirs = ufoCasesStep.config.rootDirs
    copies.push(...ufoCasesRootDirs.map(dir => path.join(dir, "case.json")))
    const outDir = this.options.outDir
    await writeFile(path.join(outDir, "casesDirs.json"), JSON.stringify(ufoCasesRootDirs), "utf-8")
    const dirsContainingPeopleJson = peopleSteps.reduce((rootDirs, peopleStep) => {
      rootDirs.push(...peopleStep.config.rootDirs)
      return rootDirs
    }, [])
    copies.push(...dirsContainingPeopleJson.map(dir => path.join(dir, "people.json")))
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
    const sourceRegistryFileName = this.options.sourceRegistryFileName
    const timeService = this.timeService
    const sourceFactory = new PersistentSourceRegistry(dataService, http, baseUrl, sourceRegistryFileName,
      timeFormat, timeService)
    const noteCounter = new NoteFileCounter()
    const noteRenderer = new NoteRenderer(noteCounter)
    const caseRenderer = new CaseSummaryRenderer(noteRenderer, sourceFactory, sourceRenderer, timeElementFactory)
    const mappings = this.options.mappings || []
    mappings.forEach(mapping => mapping.init(this))
    const timeUrlBuilder = this.timeUrlBuilder
    const databaseAggregationCommand = new DomReplaceCommand(".contents ul",
      new ChronologyReplacerFactory(timeUrlBuilder, mappings, caseRenderer)
    )
    const timeDefaultHandler = (context: HtmlRR0Context): string | undefined => {
      let title: string | undefined
      title = timeService.titleFromFile(context, context.file.name, timeTextBuilder)
      return title
    }
    const sourceCounter = new SourceFileCounter()
    const sourceReplacer = new SourceReplacer(sourceRenderer, sourceFactory, sourceCounter)
    const sourceReplacerFactory = new SourceReplacerFactory(sourceReplacer)
    const noteReplacer = new NoteReplacer(noteRenderer)
    const noteReplacerFactory = new NoteReplacerFactory(noteReplacer)
    const eventReplacer = new EventReplacer(caseRenderer, dataService)
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
      const contentVisitor = new DefaultContentVisitor(dataService, caseRenderer, timeElementFactory)
      const contentVisitors: ContentVisitor[] = [contentVisitor, searchVisitor]
      if (args.books) {
        contentVisitors.push(new BookContentVisitor(bookMeta, bookLinks))
      }
      const pageReplaceCommands = [
        ...this.options.contentReplacers,
        new SsiTitleReplaceCommand([timeDefaultHandler]),
        new AuthorReplaceCommand(timeRenderer)
      ]
      const contentsReplaceCommand = [
        new ClassDomReplaceCommand(new EventReplacerFactory(eventReplacer), "event"),
        new ClassDomReplaceCommand(sourceReplacerFactory, "source"),
        new DomReplaceCommand("time", new TimeReplacerFactory(timeReplacer, timeUrlBuilder)),
        new DomReplaceCommand("code", new CodeReplacerFactory()),
        new ClassDomReplaceCommand(new PeopleReplacerFactory(peopleService, peopleRenderer), "people"),
        new ClassDomReplaceCommand(new PlaceReplacerFactory(), "place"),
        new ClassDomReplaceCommand(new WitnessReplacerFactory(), "temoin", "temoin1", "temoin2", "temoin3"),
        new ClassDomReplaceCommand(noteReplacerFactory, "note"),
        new ClassDomReplaceCommand(new IndexedReplacerFactory(), "indexed"),
        new UnitReplaceCommand(),
        new MetaLinkReplaceCommand(new TimeLinkDefaultHandler(timeService, timeUrlBuilder, timeTextBuilder)),
        databaseAggregationCommand
      ]
      const contentReplacements = [
        ...pageReplaceCommands,
        ...contentsReplaceCommand,
        new OutlineReplaceCommand(),
        new AnchorReplaceCommand(baseUrl,
          [new CaseAnchorHandler(caseService, timeTextBuilder), new DataAnchorHandler(dataService)]),
        new ImageCommand(outDir, 275, 500),
        new OpenGraphCommand(outDir, timeFiles, baseUrl, timeService, timeTextBuilder)
      ]
      ssg.add(new RR0ContentStep({
        contentConfigs: [{roots: contentRoots, replacements: contentReplacements, getOutputPath}],
        outputFunc, fileVisitors: [], contentVisitors, force, name: "contents replacements", toProcess
      }, timeService))
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
}
