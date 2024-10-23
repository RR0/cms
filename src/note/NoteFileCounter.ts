import { PerFileCounter } from "../PerFileCounter.js"
import { HtmlRR0Context } from "../RR0Context.js"

export class NoteFileCounter extends PerFileCounter<HtmlRR0Context> {

  get value(): string {
    return "n" + this.number
  }
}
