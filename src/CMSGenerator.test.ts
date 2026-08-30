import { glob } from "glob"
import { existsSync } from "fs"
import path from "path"
import { describe, expect, test } from "vitest"

/** A whole site generation, which is minutes rather than the seconds a unit test takes. */
const GENERATION_TIMEOUT_MS = 30 * 60 * 1000
import { CMSGenerationOptions, CMSGenerator } from "./CMSGenerator.js"
import { ChronologyReplacerActions } from "./time/datasource/ChronologyReplacerActions.js"
import { BaseOvniFranceRR0Mapping } from "./time/datasource/baseovnifrance/BaseOvniFranceRR0Mapping.js"
import { FuforaRR0Mapping } from "./time/datasource/fufora/FuforaRR0Mapping.js"
import { NuforcRR0Mapping } from "./time/datasource/nuforc/NuforcRR0Mapping.js"
import { RR0CaseMapping } from "./time/datasource/rr0/RR0CaseMapping.js"
import { RR0Mapping } from "./time/datasource/rr0/RR0Mapping.js"
import { SceauRR0Mapping } from "./time/datasource/sceau/SceauRR0Mapping.js"
import { UrecatRR0Mapping } from "./time/datasource/urecat/UrecatRR0Mapping.js"
import { PeopleDirectoryStepOptions } from "./people/PeopleDirectoryStepFactory.js"
import { WitnessReplacerFactory } from "./people/witness/WitnessReplacerFactory.js"
import * as process from "node:process"
import { GeipanRR0Mapping } from "./org/eu/fr/cnes/geipan/geipan/GeipanRR0Mapping.js"
import { BaseReplaceCommand } from "./BaseReplaceCommand.js"
import { LanguageReplaceCommand } from "./lang/LanguageReplaceCommand.js"
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
import { rr0DefaultCopyright } from "./RR0DefaultCopyright.js"
import { DescriptionReplaceCommand } from "./DescriptionReplaceCommand.js"
import { TimeOptions } from "./time/TimeOptions.js"
import { CodeReplacerFactory } from "./tech/info/soft/proj/impl/lang/CodeReplacerFactory.js"
import { PlaceReplacerFactory } from "./place/PlaceReplacerFactory.js"
import { DataOptions } from "./DataOptions.js"
import { IndexedReplacerFactory } from "./index/IndexedReplacerFactory.js"
import { UnitReplaceCommand } from "./value/UnitReplaceCommand.js"
import { cmsTestUtil } from "./test/CMSTestUtil.js"

export async function getTimeFiles(): Promise<string[]> {
  const minusYearFiles = await glob(cmsTestUtil.filePath("time/-?/?/?/?/index.html"))
  const year1Files = await glob(cmsTestUtil.filePath("time/?/index.html"))
  const year2Files = await glob(cmsTestUtil.filePath("time/?/?/index.html"))
  const year3Files = await glob(cmsTestUtil.filePath("time/?/?/?/index.html"))
  const year4Files = await glob(cmsTestUtil.filePath("time/?/?/?/?/index.html"))
  const monthFiles = await glob(cmsTestUtil.filePath("time/?/?/?/?/??/index.html"))
  const dayFiles = await glob(cmsTestUtil.filePath("time/?/?/?/?/??/??/index.html"))
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
    ].map(cmsTestUtil.filePath)
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
  ].map(path => cmsTestUtil.filePath(path))
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
  ].map(path => cmsTestUtil.filePath(path))
  // A REAL TEST NOW, and it was not one before: the whole of this ran inside a `.then()` at describe
  // time, with no test() anywhere and nothing asserted. testscript ran it as a side effect and
  // reported the suite as passing, which is how a fifty-minute site build came to count as a green
  // test. vitest collects synchronously, so a suite that registers its work in a promise registers
  // nothing at all — which is what said "No test found in suite Build".
  test("generates the site", async () => {
    const timeFiles = await getTimeFiles()
    const orgFiles = await glob("test/org/**/index.html")
    const directoryOptions: PeopleDirectoryStepOptions = {
      root: cmsTestUtil.filePath("people/index.html"),
      scientists: cmsTestUtil.filePath("people/scientifiques.html"),
      ufologists: cmsTestUtil.filePath("people/ufologues.html"),
      ufoWitnesses: cmsTestUtil.filePath("people/witness/index.html"),
      astronomers: cmsTestUtil.filePath("people/astronomes.html"),
      contactees: cmsTestUtil.filePath("people/contactes.html"),
      pilots: cmsTestUtil.filePath("people/pilotes.html"),
      military: cmsTestUtil.filePath("people/militaires.html"),
      softwareEngineers: cmsTestUtil.filePath("tech/info/Personnes.html"),
      politicians: cmsTestUtil.filePath("people/politicians.html"),
      rulers: cmsTestUtil.filePath("people/dirigeants.html")
    }
    const sourceRegistryFileName = cmsTestUtil.filePath("source/index.json")
    const siteBaseUrl = "https://rr0.org/"
    const mail = "rr0@rr0.org"
    const timeOptions: TimeOptions = {rootDir: cmsTestUtil.filePath("time"), files: timeFiles}
    const orgOptions: DataOptions = {rootDir: cmsTestUtil.filePath("org"), files: orgFiles}
    const dataOptions = {
      time: timeOptions,
      org: orgOptions
    }
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
      contentRoots, copies, outDir, locale: "fr", googleMapsApiKey, mail, dataOptions,
      siteBaseUrl, timeFormat, directoryPages,
      ufoCaseDirectoryFile: cmsTestUtil.filePath("science/crypto/ufo/enquete/dossier/index.html"),
      ufoCasesExclusions: ["science/crypto/ufo/enquete/dossier/canular"].map(path => cmsTestUtil.filePath(path)),
      sourceRegistryFileName,
      directoryExcluded: ["people/Astronomers_fichiers", "people/witness", "people/author"].map(
        path => cmsTestUtil.filePath(path)),
      directoryOptions,
      mappings,
      contentReplacers: [...pageReplacers, ...contentsReplacers]
    })
    await generator.generate(args)
    // The one thing worth asserting about a generation: that it put pages where it said it would.
    // Before this the run could have produced nothing at all and still been green. The content roots
    // are under test/, so that is where the output mirrors them.
    expect(existsSync(path.join(outDir, "test", "index.html"))).toBe(true)
    expect(existsSync(path.join(outDir, "casesDirs.json"))).toBe(true)
  }, GENERATION_TIMEOUT_MS)
})
