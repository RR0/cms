import { glob } from "glob"
import { describe } from "@javarome/testscript"
import { CMSGenerationOptions, CMSGenerator } from "./CMSGenerator.js"
import {
  BaseOvniFranceRR0Mapping,
  ChronologyReplacerActions,
  FuforaRR0Mapping,
  NuforcRR0Mapping,
  RR0CaseMapping,
  RR0Mapping,
  SceauRR0Mapping,
  UrecatRR0Mapping
} from "./time/index.js"
import { PeopleDirectoryStepOptions, WitnessReplacerFactory } from "./people/index.js"
import * as process from "node:process"
import { GeipanRR0Mapping } from "./org/eu/fr/cnes/geipan/geipan/GeipanRR0Mapping"
import { BaseReplaceCommand } from "./BaseReplaceCommand"
import { LanguageReplaceCommand } from "./lang"
import {
  AngularExpressionReplaceCommand,
  ClassDomReplaceCommand,
  DomReplaceCommand,
  SsiEchoVarReplaceCommand,
  SsiIfReplaceCommand,
  SsiLastModifiedReplaceCommand,
  SsiSetVarReplaceCommand,
  StringEchoVarReplaceCommand
} from "ssg-api"
import { rr0DefaultCopyright } from "./RR0DefaultCopyright"
import { DescriptionReplaceCommand } from "./DescriptionReplaceCommand"
import { TimeOptions } from "./time/TimeOptions"
import { CodeReplacerFactory } from "./tech"
import { PlaceReplacerFactory } from "./place"
import { IndexedReplacerFactory, UnitReplaceCommand } from "./index"
import { rr0TestUtil } from "./test"

export async function getTimeFiles(): Promise<string[]> {
  const minusYearFiles = await glob(rr0TestUtil.filePath("time/-?/?/?/?/index.html"))
  const year1Files = await glob(rr0TestUtil.filePath("time/?/index.html"))
  const year2Files = await glob(rr0TestUtil.filePath("time/?/?/index.html"))
  const year3Files = await glob(rr0TestUtil.filePath("time/?/?/?/index.html"))
  const year4Files = await glob(rr0TestUtil.filePath("time/?/?/?/?/index.html"))
  const monthFiles = await glob(rr0TestUtil.filePath("time/?/?/?/?/??/index.html"))
  const dayFiles = await glob(rr0TestUtil.filePath("time/?/?/?/?/??/??/index.html"))
  return year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
    minusYearFiles).concat(monthFiles).concat(dayFiles).sort()
}

describe("Build", () => {
  console.time("ssg")
  const args: CMSGenerationOptions = {
    contents: ["test/**/*.html"],
    force: "true"
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
    ].map(rr0TestUtil.filePath)
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
  ].map(path => rr0TestUtil.filePath(path))
  const outDir = "out"
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!googleMapsApiKey) {
    throw Error("GOOGLE_MAPS_API_KEY is required")
  }
  const timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }

  const directoryPages = [
    "people/index.html", "people/witness/index.html", "people/militaires.html", "people/scientifiques.html",
    "people/astronomes.html", "people/politicians.html", "people/dirigeants.html", "people/pilotes.html",
    "people/contactes.html", "people/ufologues.html", "tech/info/Personnes.html", "people/Contributeurs.html"
  ].map(path => rr0TestUtil.filePath(path))
  getTimeFiles().then(async (timeFiles) => {
    const directoryOptions: PeopleDirectoryStepOptions = {
      root: rr0TestUtil.filePath("people/index.html"),
      scientists: rr0TestUtil.filePath("people/scientifiques.html"),
      ufologists: rr0TestUtil.filePath("people/ufologues.html"),
      ufoWitnesses: rr0TestUtil.filePath("people/witness/index.html"),
      astronomers: rr0TestUtil.filePath("people/astronomes.html"),
      contactees: rr0TestUtil.filePath("people/contactes.html"),
      pilots: rr0TestUtil.filePath("people/pilotes.html"),
      military: rr0TestUtil.filePath("people/militaires.html"),
      softwareEngineers: rr0TestUtil.filePath("tech/info/Personnes.html"),
      politicians: rr0TestUtil.filePath("people/politicians.html"),
      rulers: rr0TestUtil.filePath("people/dirigeants.html")
    }
    const sourceRegistryFileName = rr0TestUtil.filePath("source/index.json")
    const siteBaseUrl = "https://rr0.org/"
    const mail = "rr0@rr0.org"
    const timeOptions: TimeOptions = {rootDir: rr0TestUtil.filePath("time"), files: timeFiles}
    // const actions: ChronologyReplacerActions = {read: ["backup", "fetch"], write: ["backup", "pages"]}
    // const actions: ChronologyReplacerActions = {read: [], write: ["backup"]}
    const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
    const rr0Mapping = new RR0Mapping(actions)
    const geipanRR0Mapping = new GeipanRR0Mapping(actions)
    const baseOvniFranceRR0Mapping = new BaseOvniFranceRR0Mapping(actions)
    const fuforaRR0Mapping = new FuforaRR0Mapping(actions)
    const nuforcRR0Mapping = new NuforcRR0Mapping(actions)
    const urecatRR0Mapping = new UrecatRR0Mapping(actions)
    const sceauRR0Mapping = new SceauRR0Mapping(actions)
    const mappings: RR0CaseMapping<any>[] = [rr0Mapping
      /*      geipanRR0Mapping,
            baseOvniFranceRR0Mapping, fuforaRR0Mapping, nuforcRR0Mapping, urecatRR0Mapping,
            sceauRR0Mapping*/
    ]
    const pageReplacers = [
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
      new DescriptionReplaceCommand("UFO data for french-reading people", "abstract")
    ]
    const contentsReplacers = [
      new DomReplaceCommand("code", new CodeReplacerFactory()),
      new ClassDomReplaceCommand(new PlaceReplacerFactory(), "place"),
      new ClassDomReplaceCommand(new WitnessReplacerFactory(), "temoin", "temoin1", "temoin2", "temoin3"),
      new ClassDomReplaceCommand(new IndexedReplacerFactory(), "indexed"),
      new UnitReplaceCommand()
    ]
    const generator = new CMSGenerator({
      contentRoots, copies, outDir, locale: "fr", googleMapsApiKey, mail, timeOptions,
      siteBaseUrl, timeFormat, directoryPages,
      ufoCaseDirectoryFile: rr0TestUtil.filePath("science/crypto/ufo/enquete/dossier/index.html"),
      ufoCasesExclusions: ["science/crypto/ufo/enquete/dossier/canular"].map(path => rr0TestUtil.filePath(path)),
      sourceRegistryFileName,
      directoryExcluded: ["people/Astronomers_fichiers", "people/witness", "people/author"].map(
        path => rr0TestUtil.filePath(path)),
      directoryOptions,
      mappings,
      contentReplacers: [...pageReplacers, ...contentsReplacers]
    })
    await generator.generate(args)
  })
})
