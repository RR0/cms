import { NuforcRR0Mapper } from "./NuforcRR0Mapper.js"
import { NuforcHttpDatasource } from "./NuforcHttpDatasource.js"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { NuforcCaseSummary } from "./NuforcCaseSummary.js"
import { CMSContext } from "../../../CMSContext.js"

export const nuforcDatasource = new NuforcHttpDatasource()

export class NuforcRR0Mapping implements RR0CaseMapping<NuforcCaseSummary> {

  datasource: NuforcHttpDatasource = nuforcDatasource
  mapper: NuforcRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }

  init(build: CMSContext) {
    this.mapper = new NuforcRR0Mapper(build.cityService, build.countryService,
      nuforcDatasource.baseUrl.href, nuforcDatasource.copyright, nuforcDatasource.authors)
    return this
  }
}
