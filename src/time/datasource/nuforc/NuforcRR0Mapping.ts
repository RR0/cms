import { NuforcRR0Mapper } from "./NuforcRR0Mapper.js"
import { NuforcHttpDatasource } from "./NuforcHttpDatasource.js"
import { RR0CaseMapping } from "../rr0"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"
import { NuforcCaseSummary } from "./NuforcCaseSummary"
import { CMSContext } from "../../../CMSContext"

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
