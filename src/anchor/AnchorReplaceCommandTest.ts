import { AnchorReplaceCommand } from "./AnchorReplaceCommand.js"
import { rr0TestUtil } from "../test/index.js"
import { describe, expect, test } from "@javarome/testscript"
import { CaseAnchorHandler } from "./CaseAnchorHandler.js"
import { CaseService } from "../science/index.js"
import { TimeElementFactory, TimeRenderer, TimeTextBuilder } from "../time/index.js"
import path from "path"

describe("AnchorReplaceCommand", () => {

  test("replace anchor tag", async () => {
    const dataService = rr0TestUtil.dataService
    const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    const timeRenderer = new TimeRenderer(rr0TestUtil.time.urlBuilder, timeTextBuilder)
    const timeElementFactory = new TimeElementFactory(timeRenderer)
    const roswellUrl = "/src/science/crypto/ufo/enquete/dossier/Roswell"
    const caseFiles = [path.join(roswellUrl, "index.html")]
    const caseService = new CaseService(dataService, rr0TestUtil.caseFactory, timeElementFactory, caseFiles)
    const command = new AnchorReplaceCommand("https://rr0.org/", [new CaseAnchorHandler(caseService, timeTextBuilder)])
    const context = rr0TestUtil.time.newHtmlContext("1/9/9/0/08/index.html",
      `<time>2004</time> <a href="${roswellUrl}">Roswell</a>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head></head><body><time>2004</time> <a href="/src/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a></body></html>`)
  })
})
