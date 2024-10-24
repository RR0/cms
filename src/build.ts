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
import { CLI, HtmlTable } from "./util/index.js"
import {
  AngularExpressionReplaceCommand,
  ClassDomReplaceCommand,
  ContentStepConfig,
  CopyStep,
  CopyStepConfig,
  DomReplaceCommand,
  FileContents,
  FileUtil,
  HtAccessToNetlifyConfigReplaceCommand,
  HtmlLinks,
  HtmlMeta,
  HtmlSsgContext,
  OutputFunc,
  Ssg,
  SsgConfig,
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
import path from "path"
import { IndexedReplacerFactory } from "./index/IndexedReplacerFactory.js"
import { APIFactory, CodeReplacerFactory } from "./tech/index.js"
import { ContentVisitor, RR0ContentStep } from "./RR0ContentStep.js"
import { AllDataService, TypedDataFactory } from "./data/index.js"
import { UnitReplaceCommand } from "./value/index.js"
import { DefaultContentVisitor } from "./DefaultContentVisitor.js"
import { RR0EventFactory } from "./event/index.js"
import fs from "fs"

import { rr0DefaultCopyright } from "./RR0DefaultCopyright.js"
import { glob } from "glob"
import { TimeContext } from "@rr0/time"

interface RR0BuildArgs {
  /**
   * Configuration file
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

console.time("ssg")
let args = new CLI().getArgs<RR0BuildArgs>()
const configFile = args.config
if (configFile) {
  args = JSON.parse(FileContents.read(configFile).contents)
}
const cliContents = args.contents
console.debug("contents", cliContents)
const mandatoryRoots = ["people/*.html", "science/crypto/ufo/enquete/dossier/*.html"]
const contentRoots = cliContents
  ? cliContents.concat(mandatoryRoots)
  : [
    "croyance/**/*.html",
    "index.html", "404.html", "googlebe03dcf00678bb7c.html", "Contact.html", "Copyright.html", "preambule.html", "FAQ.html", "Referencement.html",
    "time/**/*.html",
    "book/**/*.html",
    "droit/**/*.html",
    "org/**/*.html",
    "people/**/*.html",
    "place/**/*.html",
    "politique/**/*.html",
    "science/**/*.html",
    "tech/**/*.html",
    "udb/*.html",
    "js/**/*.html"
  ]
const copiesArg = args.copies
const copies = copiesArg ? copiesArg : [
  "favicon.ico", "manifest.json", "opensearch.xml", "apple-touch-icon.png", "apple-touch-icon_400x400.png", "screenshot1.jpg",
  "rr0.css", "map.css", "diagram.css", "print.css", "figure.css", "section.css", "table.css", "nav.css",
  // "**/*.png", "**/*.jpg", "**/*.gif", "**/*.webp", "!out/**/*",
  "**/*.cmmn", "**/*.bpmn",
  "tech/info/soft/reseau/protocole/index.js", "tech/info/soft/reseau/protocole/ports.json", "tech/info/soft/reseau/protocole/index.css",
  "tech/info/soft/data/doc/index.js", "tech/info/soft/data/doc/index.json", "tech/info/soft/data/doc/index.css",
  "people/index.js", "people/index.css", "people/witness/index.css",
  "search/SearchComponent.mjs", "search/index.json", "search/search.css",
  "source/index.css", "note/index.css",
  "link.css", "quote.css",
  "time/DualRangeComponent.mjs",
  "index/index.js", "lang/form.js", "lang/form.css", "lang/speech.js", "lang/speech.css",
  "croyance/divin/theisme/mono/livre/islam/coran/index.js"
]

const outDir = "out"

const config: SsgConfig = {
  getOutputPath(context: SsgContext): string {
    return path.join(outDir, context.file.name)
  }
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

const timeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
}
const timeContext = new TimeContext()
const context = new RR0ContextImpl("fr", timeContext, config)
context.setVar("mail", "rr0@rr0.org")

const siteBaseUrl = "https://rr0.org/"
const eventFactory = new RR0EventFactory()
const sightingFactory = new TypedDataFactory(eventFactory, "sighting", ["index"])
const orgFactory = new OrganizationFactory(eventFactory)
const caseFactory = new CaseFactory(eventFactory)
const peopleFactory = new PeopleFactory(eventFactory)
const apiFactory = new APIFactory(eventFactory)
const bookFactory = new TypedDataFactory(eventFactory, "book")
const articleFactory = new TypedDataFactory(eventFactory, "article")
const dataService = new AllDataService(
  [orgFactory, caseFactory, peopleFactory, bookFactory, articleFactory, sightingFactory, apiFactory])
dataService.getFromDir("", ["people", "case"]).then(data => {
  console.debug(data)
})

const timeOptions: TimeServiceOptions = {
  root: "src/time",
  files: []
}
const timeTextBuilder = new TimeTextBuilder(timeFormat)
const timeUrlBuilder = new TimeUrlBuilder({rootDir: timeOptions.root})
const timeService = new TimeService(dataService, timeTextBuilder, timeUrlBuilder, timeOptions)

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY
if (!googleMapsApiKey) {
  throw Error("GOOGLE_MAPS_API_KEY is required")
}
context.setVar("mapsApiKey", googleMapsApiKey)
const placeService = new GooglePlaceService("place", googleMapsApiKey)

const orgService = new OrganizationService([], "org", undefined)

async function getTimeFiles(): Promise<string[]> {
  const minusYearFiles = await glob("time/-?/?/?/?/index.html")
  const year1Files = await glob("time/?/index.html")
  const year2Files = await glob("time/?/?/index.html")
  const year3Files = await glob("time/?/?/?/index.html")
  const year4Files = await glob("time/?/?/?/?/index.html")
  const monthFiles = await glob("time/?/?/?/?/??/index.html")
  const dayFiles = await glob("time/?/?/?/?/??/??/index.html")
  return year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
    minusYearFiles).concat(monthFiles).concat(dayFiles).sort()
}

getTimeFiles().then(async (timeFiles) => {
  context.setVar("timeFilesCount", timeFiles.length)
  const timeElementFactory = new TimeElementFactory(timeService.renderer)
  const timeReplacer = new TimeReplacer(timeElementFactory)

  const caseFiles = await caseFactory.getFiles()
  const caseService = new CaseService(dataService, caseFactory, timeElementFactory, caseFiles)

  const peopleFiles = await peopleFactory.getFiles()
  const peopleService = new PeopleService(dataService, peopleFactory, peopleFiles)
  const peopleList = await peopleService.getAll()
  context.setVar("peopleFilesCount", peopleList.length)
  const bookMeta = new Map<string, HtmlMeta>()
  const bookLinks = new Map<string, HtmlLinks>()
  const ufoCasesStep = await CaseDirectoryStep.create(outputFunc, config, caseService)
  const peopleDirectoryFactory = new PeopleDirectoryStepFactory(outputFunc, config, peopleService)
  const peopleSteps = await peopleDirectoryFactory.create()
  // Publish case.json files so that vraiufo.com will find them
  copies.push(...(ufoCasesStep.config.rootDirs).map(dir => path.join(dir, "case.json")))
  await FileUtil.writeFile(path.join(outDir, "casesDirs.json"), JSON.stringify(ufoCasesStep.config.rootDirs), "utf-8")
  copies.push(...(peopleSteps.reduce((rootDirs, peopleStep) => {
    rootDirs.push(...peopleStep.config.rootDirs)
    return rootDirs
  }, [])).map(dir => path.join(dir, "people.json")))
  await FileUtil.writeFile(path.join(outDir, "peopleDirs.json"),
    JSON.stringify(peopleList.map(people => people.dirName)), "utf-8")

  const searchVisitor = new SearchVisitor(
    {notIndexedUrls: ["404.html", "Referencement.html"], indexWords: false}, timeTextBuilder
  )
  const sourceRenderer = new SourceRenderer(timeTextBuilder)
  const sourceRegistryFileName = "source/index.json"
  const baseUrl = "https://rr0.org"
  const http = new HttpSource()
  const sourceFactory = new PersistentSourceRegistry(dataService, http, baseUrl, sourceRegistryFileName, timeFormat)
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
//  const sourceCounter = new SourceFileCounter()
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
  const toProcess = new Set<string>(
    ["people/index.html", "people/witness/index.html", "people/militaires.html", "people/scientifiques.html", "people/astronomes.html", "people/politicians.html", "people/dirigeants.html", "people/pilotes.html", "people/contactes.html", "people/ufologues.html", "tech/info/Personnes.html", "people/Contributeurs.html"])
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
    replacements: [new HtAccessToNetlifyConfigReplaceCommand(siteBaseUrl)],
    roots: [".htaccess"],
    getOutputPath(_context: SsgContext): string {
      return path.join(outDir, "netlify.toml")
    }
  }
  const includeStep = new RR0ContentStep(
    [htAccessToNetlifyConfig, {
      roots: contentRoots,
      replacements: [new SsiIncludeReplaceCommand([csvTransformer])],
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
      new AnchorReplaceCommand(siteBaseUrl,
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
    const copyConfig: CopyStepConfig = {
      getOutputPath,
      sourcePatterns: copies,
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
})
