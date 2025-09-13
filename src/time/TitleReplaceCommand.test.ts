import { SsiTitleReplaceCommand } from "./SsiTitleReplaceCommand.js"
import { cmsTestUtil } from "../test/index.js"
import { describe, expect, test } from "@javarome/testscript"
import { HtmlRR0Context } from "../RR0Context.js"

describe("TitleReplaceCommand", () => {

  let timeTextBuilder = cmsTestUtil.time.timeTextBuilder

  const timeDefaultHandler = (context: HtmlRR0Context): string | undefined => cmsTestUtil.time.getService().titleFromFile(
    context, context.file.name, timeTextBuilder)

  describe("Time page", () => {

    const fileName = cmsTestUtil.time.filePath("1/9/5/4/index.html")

    test("default title with no handler", async () => {
      const command = new SsiTitleReplaceCommand()
      const context = cmsTestUtil.newHtmlContext(fileName, `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      const fullPath = cmsTestUtil.filePath(fileName)
      expect(context.file.title).toBe(fullPath)
      expect(context.file.contents).toBe(`<html><head><title>${cmsTestUtil.filePath(
        fileName)}</title></head><body>This is about ${fullPath}!</body></html>`)
    })

    test("default title with handler", async () => {
      const command = new SsiTitleReplaceCommand([timeDefaultHandler])
      const context = cmsTestUtil.newHtmlContext(fileName, `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("1954")
      expect(context.file.contents).toBe(
        `<html><head><title>1954</title></head><body>This is about 1954!</body></html>`)
    })

    test("default month title with handler", async () => {
      const command = new SsiTitleReplaceCommand([timeDefaultHandler])
      const context = cmsTestUtil.time.newHtmlContext("1/9/5/4/10/index.html",
        `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("Octobre 1954")
      expect(context.file.contents).toBe(
        `<html><head><title>Octobre 1954</title></head><body>This is about Octobre 1954!</body></html>`)
    })

    test("default day of month title with handler", async () => {
      const command = new SsiTitleReplaceCommand([timeDefaultHandler])
      const context = cmsTestUtil.time.newHtmlContext("1/9/5/4/10/01/index.html",
        `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("Vendredi 1 octobre 1954")
      expect(context.file.contents).toBe(
        `<html><head><title>Vendredi 1 octobre 1954</title></head><body>This is about Vendredi 1 octobre 1954!</body></html>`)
    })

  })
})
