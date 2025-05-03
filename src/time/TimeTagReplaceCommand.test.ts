import { TimeReplacerFactory } from "./html/TimeReplacerFactory.js"
import { rr0TestUtil } from "../test/index.js"
import { describe, expect, test } from "@javarome/testscript"
import { DomReplaceCommand } from "ssg-api"
import { TimeReplacer } from "./html/TimeReplacer.js"
import path from "path"
import { TimeOptions } from "./TimeOptions.js"

describe("HtmlTagReplaceCommand", async () => {

  const timeRoot = rr0TestUtil.time.timeOptions.rootDir
  const timeOptions: TimeOptions = {rootDir: timeRoot, files: [rr0TestUtil.time.filePath("2/0/0/4/index.html")]}
  const timeService = await rr0TestUtil.time.getService(timeOptions)

  test("replace time tag", async () => {
    const replacer = new TimeReplacer(rr0TestUtil.time.timeElementFactory)
    const command = new DomReplaceCommand("time", new TimeReplacerFactory(replacer, rr0TestUtil.time.urlBuilder))
    const context = rr0TestUtil.time.newHtmlContext("1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head><meta name="generator" content="ssg-api"></head><body><span class="time-resolved"><a href="${path.join(
        "/", timeRoot,
        "2/0/0/4/")}"><time datetime="2004">2004</time></a></span> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a></body></html>`)
  })
})
