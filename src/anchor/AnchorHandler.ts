import { HtmlRR0Context } from "RR0Context.js"

export interface AnchorHandler {
  handle(context: HtmlRR0Context, a: HTMLAnchorElement, pathToSearch: string): Promise<void>
}
