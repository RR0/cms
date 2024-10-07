import { EssexPoliceHttpDatasource } from "./EssexPoliceHttpDatasource"
import { EssexPoliceCaseSummaryRR0Mapper } from "./EssexPoliceCaseSummaryRR0Mapper"
import { cityService } from "../../../org"
import { RR0CaseMapping } from "../rr0"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary"

export const essexPoliceHttpDatasource = new EssexPoliceHttpDatasource("https://www.essex.police.uk",
  "foi-ai/essex-police/other-information/previous-foi-requests/ufo-reports-2018-to-2023/")

export const essexPoliceCaseRR0Mapper = new EssexPoliceCaseSummaryRR0Mapper(cityService,
  essexPoliceHttpDatasource.baseUrl, essexPoliceHttpDatasource.copyright, essexPoliceHttpDatasource.authors)

export class EssexPoliceMapping implements RR0CaseMapping<EssexPoliceCaseSummary> {
  datasource = essexPoliceHttpDatasource
  mapper = essexPoliceCaseRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }
}

const actions: ChronologyReplacerActions = {read: ["backup", "fetch"], write: ["backup", "pages"]}
export const essexPoliceRR0Mapping = new EssexPoliceMapping(actions)
