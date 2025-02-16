import { FuforaHttpDatasource } from "./FuforaHttpDatasource.js"
import { FuforaCaseSummaryRR0Mapper } from "./FuforaCaseSummaryRR0Mapper.js"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"
import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { CityService } from "../../../org"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions"

export const fuforaDatasource = new FuforaHttpDatasource(new URL("https://www.fufora.fi"), "ufodb2/ufohaku.php")

export class FuforaRR0Mapping implements RR0CaseMapping<FuforaCaseSummary> {

  mapper: FuforaCaseSummaryRR0Mapper
  datasource = fuforaDatasource

  constructor(cityService: CityService, readonly actions: ChronologyReplacerActions) {
    this.mapper = new FuforaCaseSummaryRR0Mapper(cityService, fuforaDatasource.baseUrl,
      fuforaDatasource.copyright, fuforaDatasource.authors)
  }
}
