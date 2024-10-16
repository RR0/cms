import { TimeReplacerFactory } from "./TimeReplacerFactory.js"
import { rr0TestUtil } from "../test/index.js"
import { describe, expect, test } from "@javarome/testscript"
import { DomReplaceCommand } from "ssg-api"
import { TimeReplacer } from "./TimeReplacer.js"

describe("HtmlTagReplaceCommand", async () => {

  await rr0TestUtil.getTimeService({root: "src/time", files: ["src/time/2/0/0/4/index.html"]})

  test("replace time tag", async () => {
    const replacer = new TimeReplacer(rr0TestUtil.time.timeElementFactory)
    const command = new DomReplaceCommand("time", new TimeReplacerFactory(replacer))
    const context = rr0TestUtil.newHtmlContext("src/time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/src/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head><meta name="generator" content="ssg-api"></head><body><a href="/src/time/2/0/0/4/"><time datetime="2004">2004</time></a> <a href="/src/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a></body></html>`)
  })
})
