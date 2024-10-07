import { CaseDirectoryStep } from "./CaseDirectoryStep.js"
import { rr0TestUtil } from "../../../../../test/index.js"
import { FileContents, SsgContext } from "ssg-api"
import { describe, expect, test } from "@javarome/testscript"
import { AllDataService, TypedDataFactory } from "../../../../../data/index.js"
import { RR0Case } from "./RR0Case.js"
import { CaseService } from "./CaseService.js"
import { RR0EventFactory } from "../../../../../event/index.js"

describe("DirectoryStep", () => {

  async function outputFunc(context: SsgContext, info: FileContents, oudDir = rr0TestUtil.outDir + "/"): Promise<void> {
    info.name = `${oudDir}${info.name}`
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
    const context = rr0TestUtil.newContext("/science/crypto/ufo/enquete/dossier/index.html", template)
    const eventFactory = new RR0EventFactory()
    const dataService = new AllDataService([new TypedDataFactory<RR0Case>(eventFactory, "case")])
    const caseService = new CaseService(dataService, rr0TestUtil.caseFactory, rr0TestUtil.timeElementFactory)
    const step = new CaseDirectoryStep(caseService, [], [], "/science/crypto/ufo/enquete/dossier/index.html",
      outputFunc, rr0TestUtil.config)
    const stepResult = await step.execute(context)
    expect(stepResult.directoryCount).toBe(239)
  })
})
