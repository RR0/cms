import { LanguageReplaceCommand } from "./LanguageReplaceCommand"
import { rr0TestUtil } from "../test"
import { describe, expect, test } from "@javarome/testscript"

describe("LanguageReplaceCommand", () => {

  test("add english translation", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/6/8/Condoneport/index_fr.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html lang="fr"><head></head><body><span id="alternate"><a href="/src/time/1/9/6/8/CondonReport/index_fr.html">English version</a></span></body></html>`)
  })

  test("add french translation", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/6/8/CondonReport/index.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html lang="en"><head></head><body><span id="alternate"><a href="/src/time/1/9/6/8/CondonReport/index_fr.html">Version française</a></span></body></html>`)
  })
})