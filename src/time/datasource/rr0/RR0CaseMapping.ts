import { CaseMapping } from "../CaseMapping.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { CMSContext } from "../../../CMSContext.js"

/**
 * Maps some datasource case to a RR0 case.
 *
 * @param S The source case type.
 */
export interface RR0CaseMapping<S> extends CaseMapping<HtmlRR0Context, S, RR0CaseSummary> {
  init(build: CMSContext): this
}
