import { ReplaceCommand } from "ssg-api"
import { HtmlRR0Context } from "./RR0Context.js"
import { Canvas, CanvasRenderingContext2D, createCanvas, loadImage } from "canvas"
import fs from "fs"
import path from "path"
import { TimeService, TimeTextBuilder } from "./time/index.js"
import assert from "assert"

/**
 * Create a preview image for each page sharing.
 */
export class OpenGraphCommand implements ReplaceCommand<HtmlRR0Context> {

  protected num = 0

  constructor(
    protected outDir: string, protected timeFiles: string[], protected baseUrl: string,
    protected timeService: TimeService, readonly timeTextBuilder: TimeTextBuilder,
    protected width: number = 1200, protected height: number = 600
  ) {
  }

  async execute(context: HtmlRR0Context): Promise<void> {
    const title = context.file.title
    if (!title) { // Nothing to write in preview?
      return
    }
    const canvas = createCanvas(this.width, this.height)
    const canvasCtx = canvas.getContext("2d")

    const imageWidthRatio = await this.drawImage(context, canvasCtx)
    this.drawGradient(canvasCtx, imageWidthRatio)

    const margin = 40

    canvasCtx.fillStyle = "#666"
    this.drawText(canvasCtx, title, margin, 70, "400 3em system-ui,sans-serif")

    const infoStr = this.getInfoStr(context)
    canvasCtx.font = "400 1.25em system-ui,sans-serif"
    canvasCtx.fillText(infoStr, margin, this.height - 50)

    this.num++
    const imageUrl = this.writeImageFile(context, canvas)

    const outDoc = context.file.document
    const ogMeta = outDoc.createElement("meta")
    ogMeta.setAttribute("property", "og:image")
    ogMeta.setAttribute("content", imageUrl)
    outDoc.head.append(ogMeta)
    const docType = outDoc.doctype ? `<!DOCTYPE ${outDoc.doctype.name}>` : ""
    context.file.contents = `${docType}${outDoc.documentElement.outerHTML}`
  }

  getInfoStr(context: HtmlRR0Context) {
    const authors = context.file.meta.author
    const authorsStr = authors && authors.length > 0 ? authors.join(" & ") : ""
    let timeStr = ""
    const fileName = context.file.name
    if (this.timeFiles.includes(fileName)) {
      timeStr = "Chronologie"
    } else {
      const timeContext = this.timeService.setContextFromFile(context, fileName)
      if (timeContext) {
        context.time.setYear(timeContext.getYear())
        context.time.setMonth(timeContext.getMonth())
        context.time.setDayOfMonth(timeContext.getDayOfMonth())
        context.time.setHour(undefined)
        context.time.setMinutes(undefined)
        timeStr = this.timeTextBuilder.build(context)
      }
    }
    const copyrightStr = context.file.meta.copyright || "RR0.org"
    let infoStr = authorsStr ? authorsStr : ""
    infoStr = infoStr ? [infoStr, copyrightStr].join(" : ") : copyrightStr
    if (timeStr) {
      if (timeStr === "Chronologie") {
        infoStr = [timeStr, infoStr].join(", ")
      } else {
        infoStr = [infoStr, timeStr].join(", ")
      }
    }
    return infoStr
  }

  async contentStepEnd() {
    // NOP
  }

  /**
   * Draw text on the canvas, with line returns when required.
   *
   * @param canvasCtx
   * @param text The text to write.
   * @param margin
   * @param lineHeight
   * @param font
   * @protected
   */
  protected drawText(canvasCtx: CanvasRenderingContext2D, text: string, margin: number, lineHeight: number,
                     font: string) {
    canvasCtx.font = font
    let lineText = text
    let remainingText = lineText
    let splitPos = text.length
    let line = 0
    let overflow = true
    while (overflow && remainingText.length > 0) {
      const textWidth = canvasCtx.measureText(lineText)
      overflow = textWidth.width > this.width - margin
      if (overflow) {
        splitPos = lineText.lastIndexOf(" ")
        if (splitPos > 0) {
          remainingText = lineText.substring(splitPos).trim()
          lineText = lineText.substring(0, splitPos)
        } else {
          remainingText = ""
        }
      } else {
        canvasCtx.fillText(lineText, margin, 100 + line * lineHeight)
        line++
        overflow = lineText != remainingText
        lineText = remainingText
      }
    }
  }

  /**
   * Draw a left-to-right gradient from white to transparent.
   *
   * @param canvasCtx
   * @param widthRatio
   * @param startColor
   * @param endColor
   * @private
   */
  protected drawGradient(canvasCtx: CanvasRenderingContext2D, widthRatio: number,
                         startColor = "rgba(255, 255, 255, 1)",
                         endColor = "rgba(255, 255, 255, 0)") {
    canvasCtx.beginPath()
    {
      canvasCtx.strokeStyle = "transparent"
      // draw rectangle towards right hand side
      canvasCtx.rect(0, 0, this.width, this.height)
      // create linear gradient
      const grdLinear = canvasCtx.createLinearGradient(0, 0, this.width, 0)
      // Important bit here is to use rgba()
      grdLinear.addColorStop(0, startColor)
      grdLinear.addColorStop(widthRatio, startColor)
      grdLinear.addColorStop(1, endColor)
      // add gradient to rectangle
      canvasCtx.fillStyle = grdLinear
      // step below are pretty much standard to finish drawing an object to canvas
      canvasCtx.fill()
      canvasCtx.stroke()
    }
    canvasCtx.closePath()
  }

  readonly supportedFiles = "img[src$='.png'],img[src$='.jpg'],img[src$='.gif']"

  /**
   * Draw a height-scaled image on the right of the canvas.
   *
   * @param context
   * @param canvasCtx
   * @param dy
   * @protected
   */
  protected async drawImage(context: HtmlRR0Context, canvasCtx: CanvasRenderingContext2D, dy = 0) {
    const outDoc = context.file.document
    const docImages = outDoc.documentElement.querySelectorAll(this.supportedFiles)
    let widthRatio = 0.5
    let imageIndex = 0
    if (imageIndex < docImages.length) {
      const firstImage = docImages[0]
      const firstImageSrc = firstImage.getAttribute("src")
      let firstImageUrl: string
      try {
        assert.ok(firstImageSrc, "Undefined image src")
        firstImageUrl = firstImageSrc?.startsWith(this.baseUrl) ? firstImageSrc.substring(
          this.baseUrl.length) : firstImageSrc
        assert.ok(firstImageUrl, "Undefined image url")
        const dir = path.dirname(context.file.name)
        const src = firstImageUrl.startsWith("/") ? firstImageUrl.substring(1) : path.join(dir, firstImageUrl)
        const image = await loadImage(src)
        const heightRatio = this.height / image.height
        const dw = image.width * heightRatio
        const dx = this.width - dw
        widthRatio = dx / this.width
        canvasCtx.drawImage(image, dx, dy, dw, this.height)
      } catch (e) {
        context.error(`Error loading image "${firstImageUrl}", skipping it`)
        imageIndex++ // Try next image
      }
    }
    return widthRatio
  }

  protected writeImageFile(context: HtmlRR0Context, canvas: Canvas) {
    const buffer = canvas.toBuffer("image/png")
    const outputName = context.file.name
    const imageName = "og.png"
    const dir = path.dirname(outputName)
    const imageUrl = path.join("/", dir, imageName)
    const imageOutPath = path.join(this.outDir, imageUrl)
    const imageOutDir = path.dirname(imageOutPath)
    if (!fs.existsSync(imageOutDir)) {
      fs.mkdirSync(imageOutDir, {recursive: true})
    }
    context.debug("Writing OG image", imageOutPath)
    fs.writeFileSync(imageOutPath, buffer)
    return imageUrl
  }
}
