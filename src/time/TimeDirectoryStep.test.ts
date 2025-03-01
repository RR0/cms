import { describe, expect, test } from "@javarome/testscript"
import { SsgContext } from "ssg-api"
import { TimeDirectoryStep } from "./TimeDirectoryStep.js"
import { FileContents } from "@javarome/fileutil"
import { rr0TestUtil } from "../test"
import { TimeOptions } from "./TimeOptions"
import { getTimeFiles } from "../CMSGenerator.test"
import path from "path"
import { TimeService } from "./TimeService"
import { AllDataService, RR0EventFactory } from "@rr0/data"
import { TimeElementFactory } from "./html"

describe("TimeDirectoryStep", () => {

  async function outputFunc(context: SsgContext, info: FileContents, outDir = rr0TestUtil.outDir + "/"): Promise<void> {
    info.name = `${outDir}${info.name}`
  }

  test("directory", async () => {
    const template = `
<!--#include virtual="/header-start.html" -->
<title>16ème siècle</title>
<!--#include virtual="/header-end.html" -->
<p>Before</p>
<!--#echo var="directories" -->
<p>Le XVIIIᵉ siècle est celui des "Lumières".</p>
<!--#include virtual="/footer.html" -->
`
    const timeRoot = rr0TestUtil.time.timeOptions.rootDir
    const timeOptions: TimeOptions = {rootDir: timeRoot, files: await getTimeFiles()}
    const dataService = new AllDataService([new RR0EventFactory()])
    const timeService = new TimeService(dataService, timeOptions)
    const timesDirectoryPath = rr0TestUtil.filePath("time/0/0/6/5/index.html")
    const context = rr0TestUtil.newContext(timesDirectoryPath, template)
    const ufoTimesExclusions = []
    const timeDirs = timeService.files.map(timePath => path.dirname(timePath))
    const timeElementFactory = new TimeElementFactory(rr0TestUtil.time.timeRenderer)
    const step = new TimeDirectoryStep(timeService, timeElementFactory, timeDirs, ufoTimesExclusions,
      timesDirectoryPath, outputFunc, rr0TestUtil.config)
    const stepResult = await step.execute(context)
    expect(stepResult.directoryCount).toBe(22)
  })
})
