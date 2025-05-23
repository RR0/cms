import { HtmlRR0Context } from "../RR0Context.js"
import { ReferenceGenerator } from "../ReferenceGenerator.js"

export class NoteRenderer {

  constructor(protected counter: ReferenceGenerator<any>) {
  }

  render(context: HtmlRR0Context, html: string): HTMLElement {
    const noteId = this.counter.next(context)
    const doc = context.file.document
    const replacement = doc.createElement("span")
    replacement.className = "note-id"
    replacement.ariaLabel = "Note"
    replacement.textContent = noteId
    const contents = doc.createElement("span")
    contents.className = "note-contents"
    contents.innerHTML = html
    const anchor = doc.createElement("span")
    anchor.id = noteId
    anchor.className = "anchor"
    anchor.ariaHidden = "true"
    replacement.append(anchor, contents)
    return replacement
  }
}
