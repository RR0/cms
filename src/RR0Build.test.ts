import { glob } from "glob"
import { describe } from "@javarome/testscript"
import { RR0Build, RR0BuildArgs } from "./RR0Build.js"
import {
  BaseOvniFranceRR0Mapping,
  ChronologyReplacerActions,
  FuforaRR0Mapping,
  NuforcRR0Mapping,
  RR0CaseMapping,
  RR0Mapping,
  SceauRR0Mapping,
  TimeOptions,
  UrecatRR0Mapping
} from "./time/index.js"
import { PeopleDirectoryStepOptions } from "./people/index.js"
import { testFilePath } from "./test"
import * as process from "node:process"
import { GeipanRR0Mapping } from "./org/eu/fr/cnes/geipan/geipan/GeipanRR0Mapping"

describe("Build", () => {
  console.time("ssg")
  const args: RR0BuildArgs = {
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
    ].map(testFilePath)
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
  ].map(testFilePath)
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

  async function getTimeFiles(): Promise<string[]> {
    const minusYearFiles = await glob(testFilePath("time/-?/?/?/?/index.html"))
    const year1Files = await glob(testFilePath("time/?/index.html"))
    const year2Files = await glob(testFilePath("time/?/?/index.html"))
    const year3Files = await glob(testFilePath("time/?/?/?/index.html"))
    const year4Files = await glob(testFilePath("time/?/?/?/?/index.html"))
    const monthFiles = await glob(testFilePath("time/?/?/?/?/??/index.html"))
    const dayFiles = await glob(testFilePath("time/?/?/?/?/??/??/index.html"))
    return year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
      minusYearFiles).concat(monthFiles).concat(dayFiles).sort()
  }

  const directoryPages = [
    "people/index.html", "people/witness/index.html", "people/militaires.html", "people/scientifiques.html",
    "people/astronomes.html", "people/politicians.html", "people/dirigeants.html", "people/pilotes.html",
    "people/contactes.html", "people/ufologues.html", "tech/info/Personnes.html", "people/Contributeurs.html"
  ].map(testFilePath)
  getTimeFiles().then(async (timeFiles) => {
    const directoryOptions: PeopleDirectoryStepOptions = {
      root: testFilePath("people/index.html"),
      scientists: testFilePath("people/scientifiques.html"),
      ufologists: testFilePath("people/ufologues.html"),
      ufoWitnesses: testFilePath("people/witness/index.html"),
      astronomers: testFilePath("people/astronomes.html"),
      contactees: testFilePath("people/contactes.html"),
      pilots: testFilePath("people/pilotes.html"),
      military: testFilePath("people/militaires.html"),
      softwareEngineers: testFilePath("tech/info/Personnes.html"),
      politicians: testFilePath("people/politicians.html"),
      rulers: testFilePath("people/dirigeants.html")
    }
    const sourceRegistryFileName = testFilePath("source/index.json")
    const siteBaseUrl = "https://rr0.org/"
    const mail = "rr0@rr0.org"
    const timeOptions: TimeOptions = {rootDir: testFilePath("time"), files: timeFiles}
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
    const mappings: RR0CaseMapping<any>[] = [rr0Mapping,
      /*      geipanRR0Mapping,
            baseOvniFranceRR0Mapping, fuforaRR0Mapping, nuforcRR0Mapping, urecatRR0Mapping,
            sceauRR0Mapping*/
    ]
    const build = new RR0Build({
      contentRoots, copies, outDir, locale: "fr", googleMapsApiKey, mail, timeOptions,
      siteBaseUrl, timeFormat, directoryPages,
      ufoCaseDirectoryFile: testFilePath("science/crypto/ufo/enquete/dossier/index.html"),
      ufoCasesExclusions: ["science/crypto/ufo/enquete/dossier/canular"].map(testFilePath),
      sourceRegistryFileName,
      directoryExcluded: ["people/Astronomers_fichiers", "people/witness", "people/author"].map(testFilePath),
      directoryOptions,
      mappings
    })
    await build.run(args)
  })
})
