import { OpenGraphCommand } from "./OpenGraphCommand"
import { rr0TestUtil } from "./test"
import { describe, expect, test } from "@javarome/testscript"
import { TimeTextBuilder } from "./time"

describe("OpenGraphCommand", () => {

  const outDir = "/out"

  test("time page", () => {
    const timeFile = "time/0/0/6/5/index.html"
    const context = rr0TestUtil.newHtmlContext(timeFile, "")
    const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    const command = new OpenGraphCommand(outDir, [timeFile], "https://rr0.org", timeTextBuilder)
    expect(command.getInfoStr(context)).toBe("Chronologie, RR0.org")
  })
})
