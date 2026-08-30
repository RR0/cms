import { OpenGraphCommand } from "./OpenGraphCommand.js"
import { cmsTestUtil } from "./test/CMSTestUtil.js"
import { describe, expect, test } from "vitest"

describe("OpenGraphCommand", () => {

  const outDir = "/out"

  test("time page", () => {
    const context = cmsTestUtil.time.newHtmlContext("0/0/6/5/index.html", "")
    const command = new OpenGraphCommand(outDir, [context.file.name], "https://rr0.org", cmsTestUtil.time.getService(),
      cmsTestUtil.time.timeTextBuilder)
    expect(command.getInfoStr(context)).toBe("Chronologie, RR0.org")
  })
})
