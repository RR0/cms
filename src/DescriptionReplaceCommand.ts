import { HtmlRR0Context } from "./RR0Context.js"
import { ReplaceCommand } from "ssg-api"

/**
 * Adds an "abstract" HTML paragraph from a <meta name="description">, if any.
 */
export class DescriptionReplaceCommand implements ReplaceCommand<HtmlRR0Context> {
  constructor(protected readonly defaultDescription: string, protected readonly abstractClass = "abstract") {
  }

  async execute(context: HtmlRR0Context): Promise<void> {
    const file = context.file
    const inDescription = file.meta.description
    const outDoc = file.document
    let descriptionMeta = outDoc.head.querySelector("meta[name='description']")
    if (!descriptionMeta) {
      const existingAbstract = outDoc.querySelector(`.${this.abstractClass}`)
      let outDescription: string
      if (existingAbstract) {
        outDescription = inDescription || existingAbstract.textContent.toString()
      } else if (inDescription) {
        const abstractFromDescription = outDoc.createElement("p")
        abstractFromDescription.className = this.abstractClass
        abstractFromDescription.textContent = inDescription
        const body = outDoc.body
        body.insertBefore(abstractFromDescription, body.firstChild)
        outDescription = inDescription
      } else {
        outDescription = this.defaultDescription
      }
      outDescription = outDescription.replace(/\s{2,}/g, " ")
      file.meta.description = outDescription
      const descriptionMeta = outDoc.createElement("meta") as HTMLMetaElement
      descriptionMeta.name = "description"
      descriptionMeta.content = file.meta.description
      outDoc.head.append(descriptionMeta)
      const docType = outDoc.doctype ? `<!DOCTYPE ${outDoc.doctype.name}>` : ""
      context.file.contents = `${docType}${outDoc.documentElement.outerHTML}`
    }
  }

  async contentStepEnd() {
    // NOP
  }
}
