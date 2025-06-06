import { CaseMapper } from "../CaseMapper.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { RR0CaseSummary } from "./RR0CaseSummary.js"

export class RR0CaseSummaryMapper implements CaseMapper<HtmlRR0Context, RR0CaseSummary, RR0CaseSummary> {

  constructor(readonly baseUrl: URL, readonly copyright: string, readonly authors: string[]) {
  }

  map(context: HtmlRR0Context, sourceCase: RR0CaseSummary, sourceTime: Date): RR0CaseSummary {
    return sourceCase   // Mapping RR0 to RR0 is idle
  }
}
