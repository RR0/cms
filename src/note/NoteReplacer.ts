import { NoteRenderer } from "./NoteRenderer.js"
import { HtmlRR0Context } from "../RR0Context.js"

export class NoteReplacer {

  constructor(protected renderer: NoteRenderer) {
  }

  replacement(context: HtmlRR0Context, original: HTMLElement): HTMLElement {
    return this.renderer.render(context, original.innerHTML)
  }
}
