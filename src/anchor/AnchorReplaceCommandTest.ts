import { AnchorReplaceCommand } from "./AnchorReplaceCommand.js"
import { cmsTestUtil } from "../test/index.js"
import { describe, expect, test } from "@javarome/testscript"
import { CaseAnchorHandler } from "./CaseAnchorHandler.js"
import { CaseService } from "../science/crypto/ufo/enquete/dossier/CaseService.js"
import { TimeElementFactory, TimeRenderer, TimeTextBuilder } from "../time/index.js"
import path from "path"

describe("AnchorReplaceCommand", () => {

  test("replace anchor tag", async () => {
    const dataService = cmsTestUtil.dataService
    const timeTextBuilder = new TimeTextBuilder(cmsTestUtil.intlOptions)
    const timeRenderer = new TimeRenderer(cmsTestUtil.time.urlBuilder, timeTextBuilder)
    const timeElementFactory = new TimeElementFactory(timeRenderer)
    const roswellUrl = "/src/science/crypto/ufo/enquete/dossier/Roswell"
    const caseFiles = [path.join(roswellUrl, "index.html")]
    const caseService = new CaseService(dataService, cmsTestUtil.caseFactory, timeElementFactory, caseFiles)
    const command = new AnchorReplaceCommand("https://rr0.org/", [new CaseAnchorHandler(caseService, timeTextBuilder)])
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html",
      `<time>2004</time> <a href="${roswellUrl}">Roswell</a>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head></head><body><time>2004</time> <a href="/src/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a></body></html>`)
  })
})
