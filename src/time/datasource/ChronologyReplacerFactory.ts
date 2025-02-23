import { DomReplacer, ReplacerFactory } from "ssg-api"
import { ChronologyReplacer } from "./ChronologyReplacer.js"
import { HtmlRR0Context } from "../../RR0Context.js"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer.js"
import { RR0CaseMapping } from "./rr0/RR0CaseMapping.js"
import { TimeUrlBuilder } from "../TimeUrlBuilder"

export class ChronologyReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer: ChronologyReplacer

  constructor(protected timeUrlBuilder: TimeUrlBuilder, datasources: RR0CaseMapping<any>[],
              caseRenderer: CaseSummaryRenderer) {
    this.replacer = new ChronologyReplacer(datasources, caseRenderer)
  }

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
  async create(context: HtmlRR0Context): Promise<DomReplacer> {
    return {
      replace: async (ul: HTMLUListElement): Promise<HTMLUListElement> => {
        const isTimeFile = this.timeUrlBuilder.isTimeFile(context.file.name)
        if (isTimeFile) {
          ul = await this.replacer.replacement(context, ul)
        }
        return ul
      }
    }
  }
}
