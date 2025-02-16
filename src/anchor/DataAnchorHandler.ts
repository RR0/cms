import { AnchorHandler } from "./AnchorHandler.js"
import { HtmlRR0Context } from "RR0Context.js"
import { AllDataService, RR0Data } from "@rr0/data"

export class DataAnchorHandler implements AnchorHandler {

  /**
   * Source counter in the page.
   */
  protected number = 0

  constructor(protected dataService: AllDataService) {
  }

  async handle(context: HtmlRR0Context, linkEl: HTMLAnchorElement, pathToSearch: string): Promise<void> {
    const dataList = await this.dataService.getFromDir(pathToSearch, ["api", "product", "org"], ["index.json"])
    for (const data of dataList) {
      const type = data?.type
      switch (type) {
        case "api":
          this.handleApi(context, data, linkEl)
          break
        case "product":
          this.handleProduct(context, data, linkEl)
          break
        case "org":
          this.handleOrg(context, data, linkEl)
          break
      }
    }
  }

  protected handleNote(context: HtmlRR0Context, linkEl: HTMLAnchorElement, note: string) {
    this.number++
    const noteStr = this.number.toString()
    const noteId = `deprecated-${noteStr}`
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "note-id"
    replacement.ariaLabel = "Note"
    replacement.textContent = "d" + noteStr
    const contents = outputDoc.createElement("span")
    contents.className = "note-contents"
    contents.innerHTML = note
    const anchor = outputDoc.createElement("span")
    anchor.id = noteId
    anchor.className = "anchor"
    replacement.append(anchor, contents)
    linkEl.parentNode.insertBefore(replacement, linkEl.nextSibling)
  }

  protected handleApi(context: HtmlRR0Context, data: RR0Data, linkEl: HTMLAnchorElement) {
    const next = data.next
    if (linkEl.classList.contains("deprecated")) {
      return
    }
    if (next) {
      linkEl.classList.add("deprecated")
      let notes = data.notes
      if (notes?.length <= 0) {
        notes = [`Remplacé par ${next}`]
      }
      for (const note of notes) {
        this.handleNote(context, linkEl, note)
      }
    }
  }

  protected handleProduct(context: HtmlRR0Context, data: RR0Data, linkEl: HTMLAnchorElement) {
    return this.handleApi(context, data, linkEl)
  }

  protected handleOrg(context: HtmlRR0Context, data: RR0Data, linkEl: HTMLAnchorElement) {
    return this.handleApi(context, data, linkEl)
  }
}
