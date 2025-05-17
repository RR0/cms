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
    return new class implements DomReplacer {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        if (!original.hasChildNodes()) {
          const inputFile = context.file
          const fileName = inputFile.name
          const langInfo = inputFile.lang
          const variants = langInfo.variants
          let fileLang = langInfo.lang
          let pageLang: string
          const hasEnglishVariant = variants.includes("en")
          if (hasEnglishVariant) {
            pageLang = fileLang ? fileLang : "fr"
          } else if (variants.includes("fr")) {
            if (fileLang && fileLang !== "fr") {
              pageLang = fileLang
            } else {
              pageLang = "en"
              fileLang = fileName.includes("_" + pageLang) ? pageLang : ""
            }
          } else {
            pageLang = "fr"
          }
          inputFile.document.documentElement.lang = inputFile.lang.lang = pageLang
          const langVariants = variants.length == 1 && variants[0] == "" ? [pageLang == "fr" ? "en" : "fr"] : variants
          const doc = inputFile.document
          for (let i = 0; i < langVariants.length; i++) {
            const langVariant = langVariants[i]
            const altLink = doc.createElement("a")
            const toReplace = (fileLang ? "_" + fileLang : "") + "."
            let replacement = `${variants[i] == "" ? "" : "_" + langVariant}.`
            altLink.href = "/" + fileName.replace(toReplace, replacement)
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
