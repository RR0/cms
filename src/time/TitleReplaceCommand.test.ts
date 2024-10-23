import { SsiTitleReplaceCommand } from "./SsiTitleReplaceCommand.js"
import { rr0TestUtil } from "../test/index.js"
import { describe, expect, test } from "@javarome/testscript"
import { HtmlRR0Context } from "../RR0Context.js"
import { Time } from "./Time.js"

describe("TitleReplaceCommand", () => {

  let timeTextBuilder = rr0TestUtil.time.timeTextBuilder

  const timeDefaultHandler = (context: HtmlRR0Context): string | undefined => {
    let title: string | undefined
    title = Time.titleFromFile(context, context.file.name, timeTextBuilder)
    return title
  }

  describe("Time page", () => {

    const fileName = rr0TestUtil.time.filePath("1/9/5/4/index.html")

    test("default title with no handler", async () => {
      const command = new SsiTitleReplaceCommand()
      const context = rr0TestUtil.newHtmlContext(fileName, `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      const fullPath = rr0TestUtil.filePath(fileName)
      expect(context.file.title).toBe(fullPath)
      expect(context.file.contents).toBe(`This is about ${fullPath}!`)
    })

    test("default title with handler", async () => {
      const command = new SsiTitleReplaceCommand([timeDefaultHandler])
      const context = rr0TestUtil.newHtmlContext(fileName, `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("1954")
      expect(context.file.contents).toBe("This is about 1954!")
    })

    test("default month title with handler", async () => {
      const command = new SsiTitleReplaceCommand([timeDefaultHandler])
      const context = rr0TestUtil.time.newHtmlContext("1/9/5/4/10/index.html",
        `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("Octobre 1954")
      expect(context.file.contents).toBe("This is about Octobre 1954!")
    })

    test("default day of month title with handler", async () => {
      const command = new SsiTitleReplaceCommand([timeDefaultHandler])
      const context = rr0TestUtil.time.newHtmlContext("1/9/5/4/10/01/index.html",
        `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("Vendredi 1 octobre 1954")
      expect(context.file.contents).toBe("This is about Vendredi 1 octobre 1954!")
    })

  })
})
