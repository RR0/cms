import { DomReplaceCommand, DomReplacer } from "ssg-api"
import { HtmlRR0Context } from "RR0Context.js"

/**
 * Determine page language and ddd links to page language variants,
 */
export class LanguageReplaceCommand extends DomReplaceCommand<HTMLElement, HtmlRR0Context> {

  constructor() {
    super("#alternate", undefined)
  }

  protected async createReplacer(context: HtmlRR0Context): Promise<DomReplacer> {
    const doc = context.file.document
    return new class implements DomReplacer {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        if (!original.hasChildNodes()) {
          const inputFile = context.file
          const langInfo = inputFile.lang
          const variants = langInfo.variants
          const foundLang = langInfo.lang
          const pageLang = variants.includes("en") ?
            foundLang ? foundLang : "fr" : variants.includes("fr") ?
              foundLang ? foundLang : "en"
              : "fr"
          context.file.document.documentElement.lang = inputFile.lang.lang = pageLang
          const langVariants = variants.length == 1 && variants[0] == "" ? [pageLang == "fr" ? "en" : "fr"] : variants
          const fileName = inputFile.name
          for (let i = 0; i < langVariants.length; i++) {
            const langVariant = langVariants[i]
            const altLink = doc.createElement("a")
            altLink.href = "/" + fileName.replace((foundLang ? "_" + foundLang : "") + ".",
              `${variants[i] == "" ? "" : "_" + langVariant}.`)
            const altText = langVariant === "en" ? "English version" : "Version française"
            altLink.textContent = Buffer.from(altText, "utf-8").toString()
            original.appendChild(altLink)
            context.debug("Added translation link", original.outerHTML, "in", fileName)
          }
        }
        return original
      }
    }
  }
}
