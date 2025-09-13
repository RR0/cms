import { TimeReplacerFactory } from "./html/TimeReplacerFactory.js"
import { cmsTestUtil } from "../test/index.js"
import { describe, expect, test } from "@javarome/testscript"
import { DomReplaceCommand } from "ssg-api"
import { TimeReplacer } from "./html/TimeReplacer.js"
import path from "path"
import { TimeOptions } from "./TimeOptions.js"

describe("HtmlTagReplaceCommand", async () => {

  const timeRoot = cmsTestUtil.time.timeOptions.rootDir
  const timeOptions: TimeOptions = {rootDir: timeRoot, files: [cmsTestUtil.time.filePath("2/0/0/4/index.html")]}
  const timeService = await cmsTestUtil.time.getService(timeOptions)

  test("replace time tag", async () => {
    const replacer = new TimeReplacer(cmsTestUtil.time.timeElementFactory)
    const command = new DomReplaceCommand("time", new TimeReplacerFactory(replacer, cmsTestUtil.time.urlBuilder))
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head><meta name="generator" content="ssg-api"></head><body><span class="time-resolved"><a href="${path.join(
        "/", timeRoot,
        "2/0/0/4/")}"><time datetime="2004">2004</time></a></span> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a></body></html>`)
  })
})
