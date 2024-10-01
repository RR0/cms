import { AnchorReplaceCommand } from "./AnchorReplaceCommand"
import { rr0TestUtil } from "../test"
import { describe, expect, test } from "@javarome/testscript"
import { CaseAnchorHandler } from "./CaseAnchorHandler"
import { CaseService } from "../science"
import { TimeElementFactory, TimeRenderer, TimeTextBuilder } from "../time"

describe("AnchorReplaceCommand", () => {

  test("replace anchor tag", async () => {
    const dataService = rr0TestUtil.dataService
    const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    const timeRenderer = new TimeRenderer([], timeTextBuilder)
    const timeElementFactory = new TimeElementFactory(timeRenderer)
    const caseService = new CaseService(dataService, rr0TestUtil.caseFactory, timeElementFactory)
    const command = new AnchorReplaceCommand("https://rr0.org/", [new CaseAnchorHandler(caseService, timeTextBuilder)])
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head></head><body><time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a></body></html>`)
  })
})
