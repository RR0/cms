import { describe, expect, test } from "@javarome/testscript"
import { SsgContext } from "ssg-api"
import { TimeDirectoryStep } from "./TimeDirectoryStep.js"
import { FileContents } from "@javarome/fileutil"
import { cmsTestUtil } from "../test/index.js"
import { TimeOptions } from "./TimeOptions.js"
import { getTimeFiles } from "../CMSGenerator.test.js"
import path from "path"
import { TimeService } from "./TimeService.js"
import { AllDataService, RR0EventFactory } from "@rr0/data"
import { TimeElementFactory } from "./html/index.js"

describe("TimeDirectoryStep", () => {

  async function outputFunc(context: SsgContext, info: FileContents, outDir = cmsTestUtil.outDir + "/"): Promise<void> {
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
    const timeRoot = cmsTestUtil.time.timeOptions.rootDir
    const timeOptions: TimeOptions = {rootDir: timeRoot, files: await getTimeFiles()}
    const dataService = new AllDataService([new RR0EventFactory()])
    const timeService = new TimeService(dataService, timeOptions)
    const timesDirectoryPath = cmsTestUtil.filePath("time/0/0/6/5/index.html")
    const context = cmsTestUtil.newContext(timesDirectoryPath, template)
    const ufoTimesExclusions = []
    const timeDirs = timeService.files.map(timePath => path.dirname(timePath))
    const timeElementFactory = new TimeElementFactory(cmsTestUtil.time.timeRenderer)
    const step = new TimeDirectoryStep(timeService, timeElementFactory, timeDirs, ufoTimesExclusions,
      timesDirectoryPath, outputFunc, cmsTestUtil.config)
    const stepResult = await step.execute(context)
    expect(stepResult.directoryCount).toBe(23)
  })
})
