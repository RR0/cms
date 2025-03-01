import { describe, expect, test } from "@javarome/testscript"
import { SsgContext } from "ssg-api"
import { CaseDirectoryStep } from "./CaseDirectoryStep.js"
import { rr0TestUtil } from "../../../../../test/index.js"
import { RR0Case } from "./RR0Case.js"
import { CaseService } from "./CaseService.js"
import { TimeElementFactory } from "../../../../../time/html/TimeElementFactory.js"
import { FileContents } from "@javarome/fileutil"
import { AllDataService, RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { RR0CaseJson } from "./RR0CaseJson"

describe("DirectoryStep", () => {

  async function outputFunc(context: SsgContext, info: FileContents, outDir = rr0TestUtil.outDir + "/"): Promise<void> {
    info.name = `${outDir}${info.name}`
  }

  test("", async () => {
    const template = `
<!--#include virtual="/header-start.html" -->
<title>Dossiers ufologiques</title>
<!--#include virtual="/header-end.html" -->
<p>Before</p>
<!--#echo var="directories" -->
<p>After</p>
<!--#include virtual="/footer.html" -->`
    const casesDirectoryPath = rr0TestUtil.filePath("science/crypto/ufo/enquete/dossier/index.html")
    const context = rr0TestUtil.newContext(casesDirectoryPath, template)
    const eventFactory = new RR0EventFactory()
    const dataService = new AllDataService([new TypedDataFactory<RR0Case, RR0CaseJson>(eventFactory, "case")])
    const caseFiles = await rr0TestUtil.caseFactory.getFiles()
    const timeRenderer = rr0TestUtil.time.timeRenderer
    const timeElementFactory = new TimeElementFactory(timeRenderer)
    const caseService = new CaseService(dataService, rr0TestUtil.caseFactory, timeElementFactory, caseFiles)
    const ufoCasesExclusions = []
    const step = new CaseDirectoryStep(caseService, caseService.files, ufoCasesExclusions, casesDirectoryPath,
      outputFunc, rr0TestUtil.config)
    const stepResult = await step.execute(context)
    expect(stepResult.directoryCount).toBe(3)
  })
})
