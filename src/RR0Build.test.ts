import { glob } from "glob"
import { describe } from "@javarome/testscript"
import { FileContents } from "@javarome/fileutil"
import { CLI } from "./util/index.js"
import { RR0Build, RR0BuildArgs } from "./RR0Build.js"
import { TimeServiceOptions } from "./time/index.js"
import { PeopleDirectoryStepOptions } from "./people/index.js"
import { testFilePath } from "./test"
import * as process from "node:process"

describe("Build", () => {
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
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!googleMapsApiKey) {
    throw Error("GOOGLE_MAPS_API_KEY is required")
  }
  const timeOptions: TimeServiceOptions = {
    root: "time",
    files: []
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

  const directoryPages = [
    "people/index.html", "people/witness/index.html", "people/militaires.html", "people/scientifiques.html",
    "people/astronomes.html", "people/politicians.html", "people/dirigeants.html", "people/pilotes.html",
    "people/contactes.html", "people/ufologues.html", "tech/info/Personnes.html", "people/Contributeurs.html"
  ].map(testFilePath)
  getTimeFiles().then(async (timeFiles) => {
    const directoryOptions: PeopleDirectoryStepOptions = {
      root: "people/index.html",
      scientists: "people/scientifiques.html",
      ufologists: "people/ufologues.html",
      ufoWitnesses: "people/witness/index.html",
      astronomers: "people/astronomes.html",
      contactees: "people/contactes.html",
      pilots: "people/pilotes.html",
      military: "people/militaires.html",
      softwareEngineers: "tech/info/Personnes.html",
      politicians: "people/politicians.html",
      rulers: "people/dirigeants.html"
    }
    const sourceRegistryFileName = "source/index.json"
    const siteBaseUrl = "https://rr0.org/"
    const mail = "rr0@rr0.org"
    const build = new RR0Build({
      contentRoots, copies, outDir, locale: "fr", googleMapsApiKey, mail, timeOptions,
      siteBaseUrl, timeFormat, timeFiles, directoryPages,
      ufoCaseDirectoryFile: "science/crypto/ufo/enquete/dossier/index.html",
      ufoCasesExclusions: ["science/crypto/ufo/enquete/dossier/canular"],
      sourceRegistryFileName,
      directoryExcluded: ["people/Astronomers_fichiers", "people/witness", "people/author"],
      directoryOptions,
      inDir: testFilePath
    })
    await build.run(args)
  })
})
