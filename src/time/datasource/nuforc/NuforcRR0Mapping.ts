import { NuforcRR0Mapper } from "./NuforcRR0Mapper.js"
import { NuforcHttpDatasource } from "./NuforcHttpDatasource.js"
import { CityService, CountryService } from "../../../org"
import { RR0CaseMapping } from "../rr0"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"
import { NuforcCaseSummary } from "./NuforcCaseSummary"

export const nuforcDatasource = new NuforcHttpDatasource()

export class NuforcRR0Mapping implements RR0CaseMapping<NuforcCaseSummary> {
  datasource: NuforcHttpDatasource = nuforcDatasource
  mapper: NuforcRR0Mapper

  constructor(cityService: CityService, countryService: CountryService, readonly actions: ChronologyReplacerActions) {
    this.mapper = new NuforcRR0Mapper(cityService, countryService,
      nuforcDatasource.baseUrl.href, nuforcDatasource.copyright, nuforcDatasource.authors)
  }
}
