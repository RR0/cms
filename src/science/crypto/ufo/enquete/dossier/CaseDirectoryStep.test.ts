import path from "path"
import { describe, expect, test } from "@javarome/testscript"
import { SsgContext } from "ssg-api"
import { CaseDirectoryStep } from "./CaseDirectoryStep.js"
import { rr0TestUtil } from "../../../../../test/index.js"
import { RR0Case } from "./RR0Case.js"
import { CaseService } from "./CaseService.js"
import { TimeElementFactory } from "../../../../../time/html/TimeElementFactory.js"
import { FileContents } from "@javarome/fileutil"
import { AllDataService, RR0EventFactory, TypedDataFactory } from "@rr0/data"

describe("DirectoryStep", () => {

  const root = "src"

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
    const casesDirectoryPath = path.join(root, "science/crypto/ufo/enquete/dossier/index.html")
    const context = rr0TestUtil.newContext(casesDirectoryPath, template)
    const eventFactory = new RR0EventFactory()
    const dataService = new AllDataService([new TypedDataFactory<RR0Case>(eventFactory, "case")])
    const caseFiles = []
    const timeService = rr0TestUtil.time.getService()
    const timeElementFactory = new TimeElementFactory(timeService.renderer)
    const caseService = new CaseService(dataService, rr0TestUtil.caseFactory, timeElementFactory, caseFiles)
    const step = new CaseDirectoryStep(caseService, [], [], casesDirectoryPath,
      outputFunc, rr0TestUtil.config)
    const stepResult = await step.execute(context)
    expect(stepResult.directoryCount).toBe(239)
  })
})
