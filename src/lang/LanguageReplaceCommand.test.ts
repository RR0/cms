import { LanguageReplaceCommand } from "./LanguageReplaceCommand.js"
import { cmsTestUtil } from "../test/CMSTestUtil.js"
import { describe, expect, test } from "vitest"

describe("LanguageReplaceCommand", () => {

  test("add default english translation", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/6/8/CondonReport/index_fr.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html lang="fr"><head><meta name="generator" content="ssg-api"></head><body><span id="alternate"><a href="/${cmsTestUtil.filePath(
        cmsTestUtil.time.filePath(
          "1/9/6/8/CondonReport/index.html"))}">English version</a></span></body></html>`)
  })

  test("declared language of a file without variant", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html",
      `<meta http-equiv="content-language" content="en"><span id="alternate"/>`)
    await new LanguageReplaceCommand().execute(context)
    expect(context.file.lang.lang).toBe("en")
    expect(context.file.document.documentElement.lang).toBe("en")
  })

  test("English text of a file without variant", async () => {
    const text = "On the morning of the 6th of November, the news was that a young woodcutter had disappeared in a flash of light. It was the main attempt of this presentation to set the record straight on behalf of the witness, who has been harassed by some of the media. They had been working all day and there was a glow that would not fade when they were on the road."
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", `<span id="alternate"></span><p>${text}</p>`)
    await new LanguageReplaceCommand().execute(context)
    expect(context.file.lang.lang).toBe("en")
    expect(context.file.document.documentElement.lang).toBe("en")
  })

  test("French text quoting English stays French", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html",
      `<span id="alternate"></span><p>Le témoin est revenu sur les lieux avec des amis. Il a vu une lueur dans les arbres et ce qui ressemblait à un engin. Selon le rapport du Bulletin, cette affaire est la plus importante de l'année pour les enquêteurs, qui ne sont pas d'accord sur ce point :</p><blockquote>${"It was the main attempt of this presentation to set the record straight on behalf of the witness. ".repeat(
        5)}</blockquote>`)
    await new LanguageReplaceCommand().execute(context)
    expect(context.file.lang.lang).toBe("fr")
  })

  test("add english translation", async () => {
    const context = cmsTestUtil.time.newHtmlContext("0/6/4/0/ChronicaMinor/index_fr.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html lang="fr"><head><meta name="generator" content="ssg-api"></head><body><span id="alternate"><a href="/${cmsTestUtil.filePath(
        cmsTestUtil.time.filePath(
          "0/6/4/0/ChronicaMinor/index_en.html"))}">English version</a></span></body></html>`)
  })

  test("add french translation from default", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/6/8/CondonReport/index.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html lang="en"><head><meta name="generator" content="ssg-api"></head><body><span id="alternate"><a href="/${cmsTestUtil.filePath(
        cmsTestUtil.time.filePath(
          "1/9/6/8/CondonReport/index_fr.html"))}">Version française</a></span></body></html>`)
  })

  test("add french translation", async () => {
    const context = cmsTestUtil.time.newHtmlContext("0/6/4/0/ChronicaMinor/index_en.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html lang="en"><head><meta name="generator" content="ssg-api"></head><body><span id="alternate"><a href="/${cmsTestUtil.filePath(
        cmsTestUtil.time.filePath(
          "0/6/4/0/ChronicaMinor/index_fr.html"))}">Version française</a></span></body></html>`)
  })
})
