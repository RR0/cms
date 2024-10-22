import { OpenGraphCommand } from "./OpenGraphCommand.js"
import { rr0TestUtil } from "./test/index.js"
import { describe, expect, test } from "@javarome/testscript"
import { TimeTextBuilder } from "./time/index.js"

describe("OpenGraphCommand", () => {

  const outDir = "/out"

  test("time page", () => {
    const timeFile = rr0TestUtil.time.filePath("0/0/6/5/index.html")
    const context = rr0TestUtil.newHtmlContext(timeFile, "")
    const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    const command = new OpenGraphCommand(outDir, [context.file.name], "https://rr0.org", timeTextBuilder)
    expect(command.getInfoStr(context)).toBe("Chronologie, RR0.org")
  })
})
