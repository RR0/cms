import { DomReplacement } from "../../../../../../time/DomReplacement.js"
import { HtmlRR0Context } from "../../../../../../RR0Context.js"
import { CodeParser } from "./CodeParser.js"

export class CodeReplacer implements DomReplacement<HtmlRR0Context> {
  constructor(protected parsers: CodeParser[]) {
  }

  async replacement(context: HtmlRR0Context, codeElement: HTMLElement): Promise<HTMLElement> {
    if (codeElement) {
      const output = context.file.document.createElement("code")
      const innerHTML = codeElement.innerHTML
      const lines = innerHTML.split("\n")
      this.trimEnd(lines)
      this.removeIndent(lines)
      this.parse(lines)
      output.innerHTML = lines.join("\n")
      codeElement = output
    }
    return codeElement
  }

  protected removeIndent(lines: string[]) {
    let minIndent = Number.MAX_VALUE
    for (const line of lines) {
      if (line.length > 0) {
        let i = 0
        while (line.charAt(i) === " ") i++
        if (i < minIndent) {
          minIndent = i
        }
      }
    }
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      lines[i] = line.substring(minIndent)
    }
  }

  protected trimEnd(lines: string[]) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      lines[i] = line.trimEnd()
    }
  }

  protected parse(lines: string[]) {
    for (const parser of this.parsers) {
      parser.parse(lines)
    }
  }
}
