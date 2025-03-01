import { OpenGraphCommand } from "./OpenGraphCommand.js"
import { rr0TestUtil } from "./test/index.js"
import { describe, expect, test } from "@javarome/testscript"

describe("OpenGraphCommand", () => {

  const outDir = "/out"

  test("time page", () => {
    const context = rr0TestUtil.time.newHtmlContext("0/0/6/5/index.html", "")
    const command = new OpenGraphCommand(outDir, [context.file.name], "https://rr0.org", rr0TestUtil.time.getService(),
      rr0TestUtil.time.timeTextBuilder)
    expect(command.getInfoStr(context)).toBe("Chronologie, RR0.org")
  })
})
