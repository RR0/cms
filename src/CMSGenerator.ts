import path from "path"
import fs from "fs"
import { CaseSummaryRenderer } from "./time/CaseSummaryRenderer.js"
import { EventReplacer, EventReplacerFactory } from "./time/EventReplacerFactory.js"
import { SsiTitleReplaceCommand } from "./time/SsiTitleReplaceCommand.js"
import { TimeLinkDefaultHandler } from "./time/TimeLinkDefaultHandler.js"
import { TimeService } from "./time/TimeService.js"
import { TimeUrlBuilder } from "./time/TimeUrlBuilder.js"
import { ChronologyReplacerFactory } from "./time/datasource/ChronologyReplacerFactory.js"
import { CsvMapper } from "./time/datasource/CsvMapper.js"
import { HttpSource } from "./time/datasource/HttpSource.js"
import { RR0CaseMapping } from "./time/datasource/rr0/RR0CaseMapping.js"
import { TimeElementFactory } from "./time/html/TimeElementFactory.js"
import { TimeRenderer } from "./time/html/TimeRenderer.js"
import { TimeReplacer } from "./time/html/TimeReplacer.js"
import { TimeReplacerFactory } from "./time/html/TimeReplacerFactory.js"
import { TimeTextBuilder } from "./time/text/TimeTextBuilder.js"
import { CaseDirectoryStep } from "./science/crypto/ufo/enquete/dossier/CaseDirectoryStep.js"
import { CaseFactory } from "./science/crypto/ufo/enquete/dossier/CaseFactory.js"
import { CaseService } from "./science/crypto/ufo/enquete/dossier/CaseService.js"
import { cities } from "./org/Cities.js"
import { CmsOrganizationFactory } from "./org/CmsOrganizationFactory.js"
import { OrganizationService } from "./org/OrganizationService.js"
import { countries } from "./org/country/Countries.js"
import { RegionService, regions } from "./org/country/region/RegionService.js"
import { DepartmentService, departments } from "./org/country/region/department/DepartmentService.js"
import { CityService } from "./org/country/region/department/city/CityService.js"
import { HtmlRR0Context, RR0ContextImpl } from "./RR0Context.js"
import { HtmlTable } from "./util/html/HtmlTable.js"
import {
  ClassDomReplaceCommand,
  ContentStepConfig,
  CopyStep,
  DomReplaceCommand,
  FileCopyConfig,
  FileWriteConfig,
  HtAccessToNetlifyConfigReplaceCommand,
  HtAccessToNetlifyRedirectsReplaceCommand,
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
import { PeopleDirectoryStepFactory, PeopleDirectoryStepOptions } from "./people/PeopleDirectoryStepFactory.js"
import { PeopleReplacerFactory } from "./people/PeopleReplacerFactory.js"
import { AuthorReplaceCommand } from "./people/author/AuthorReplaceCommand.js"
import { PersistentSourceRegistry } from "./source/PersistentSourceRegistry.js"
import { SourceFileCounter } from "./source/SourceFileCounter.js"
import { SourceIndexStep } from "./source/SourceIndexStep.js"
import { SourceRenderer } from "./source/SourceRenderer.js"
import { SourceReplacer } from "./source/SourceReplacer.js"
import { SourceReplacerFactory } from "./source/SourceReplacerFactory.js"
import { NoteFileCounter } from "./note/NoteFileCounter.js"
import { NoteRenderer } from "./note/NoteRenderer.js"
import { NoteReplacer } from "./note/NoteReplacer.js"
import { NoteReplacerFactory } from "./note/NoteReplacerFactory.js"
import { AnchorReplaceCommand } from "./anchor/AnchorReplaceCommand.js"
import { CaseAnchorHandler } from "./anchor/CaseAnchorHandler.js"
import { DataAnchorHandler } from "./anchor/DataAnchorHandler.js"
import { MetaLinkReplaceCommand } from "./MetaLinkReplaceCommand.js"
import { OutlineReplaceCommand } from "./outline/OutlineReplaceCommand.js"
import { ImageCommand } from "./ImageCommand.js"
import { SearchIndexStep } from "./search/SearchIndexStep.js"
import { SearchVisitor } from "./search/SearchVisitor.js"
import { OpenGraphCommand } from "./OpenGraphCommand.js"
import { BookContentVisitor } from "./book/BookContentVisitor.js"
import { BookDirectoryStep } from "./book/BookDirectoryStep.js"
import { APIFactory } from "./tech/info/soft/APIFactory.js"
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
  /**
   * Where the redirects read out of `.htaccess` are written, and in which of Netlify's two formats.
   *
   * Defaults to a `netlify.toml` at the repository root, which is what this has always produced.
   *
   * The `redirects` format writes Netlify's plainer `_redirects` instead, and the reason to choose
   * it is WHERE it can be put. `netlify.toml` is read from the CLONE, before any build command runs,
   * so a site built by Netlify from git must keep it in version control — a generated file, tracked,
   * inviting exactly the hand-edit that overwrites itself. `_redirects` and `_headers` are read from
   * the DEPLOYED directory, so they can be build output like everything else and never need to be
   * committed at all.
   *
   * `preambleFile` holds whatever the `.htaccess` cannot say and is emitted ahead of the generated
   * lines: a redirect carrying its own status or `force` (`301!` in the plain format), one from an
   * absolute URL on another domain. Without it those lines have nowhere to live but the generated
   * file itself, where every full build wipes them — which is exactly how one site's `ufoathome.org`
   * redirects and its CORS headers disappeared twice. See ssg-api's HtAccessReplaceCommand; naming a
   * file that is not there fails the build rather than dropping it in silence.
   *
   * Headers have no generator because `.htaccess` here carries no `Header` directive worth
   * translating: in the plain format they are simply a static `_headers` file among the copies.
   */
  netlify?: {
    format: "toml" | "redirects"
    outputPath: string
    preambleFile?: string
  }
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
      {
        notIndexedUrls: [
          "404.html",
          "Referencement.html",
          "org/ca/company/avro/Avrocar/index.html",
          "org/renseignement.html",
          "time/1/9/7/7/Poher_Matrice/app/dist/index.html"
        ], indexWords: false
      }, timeTextBuilder
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

    const netlify = this.options.netlify ?? {format: "toml", outputPath: "netlify.toml"}
    const htAccessToNetlifyConfig: ContentStepConfig = {
      replacements: [
        netlify.format === "redirects"
          ? new HtAccessToNetlifyRedirectsReplaceCommand(this.options.siteBaseUrl, netlify.preambleFile)
          : new HtAccessToNetlifyConfigReplaceCommand(this.options.siteBaseUrl, netlify.preambleFile)
      ],
      roots: [".htaccess"],
      getOutputPath: (_context: SsgContext) => netlify.outputPath
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
      ssg.add(new SearchIndexStep("search/index.json", searchVisitor, outDir,
        (context, fileName) => timeService.setContextFromFile(context, fileName)))
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
      throw err
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

  protected async setupCases(timeElementFactory: TimeElementFactory) {
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
