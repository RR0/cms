import { LanguageReplaceCommand } from "./LanguageReplaceCommand.js"
import { rr0TestUtil } from "../test/index.js"
import { describe, expect, test } from "@javarome/testscript"

describe("LanguageReplaceCommand", () => {

  test("add english translation", {skip: true}, async () => {
    const context = rr0TestUtil.time.newHtmlContext("1/9/6/8/CondonReport/index_fr.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html lang="fr"><head></head><body><span id="alternate"><a href="${rr0TestUtil.time.filePath(
        "1/9/6/8/CondonReport/index_fr.html")}">English version</a></span></body></html>`)
  })

  test("add french translation", {skip: true}, async () => {
    const context = rr0TestUtil.time.newHtmlContext("1/9/6/8/CondonReport/index.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html lang="en"><head><meta name="generator" content="ssg-api"></head><body><span id="alternate"><a href="${rr0TestUtil.time.filePath(
        "1/9/6/8/CondonReport/index_fr.html")}">Version française</a></span></body></html>`)
  })
})
