import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper.js"
import { RR0HttpDatasource } from "./RR0HttpDatasource.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { RR0CaseMapping } from "./RR0CaseMapping.js"
import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { RR0FileDatasource } from "./RR0FileDatasource.js"
import { CityService } from "../../../org"
import { RR0Datasource } from "./RR0Datasource"

export class RR0Mapping implements RR0CaseMapping<RR0CaseSummary> {

  static baseUrl = new URL("https://rr0.org")
  static searchPath = "time"
  readonly datasource: RR0Datasource
  readonly fileDatasource: RR0FileDatasource
  readonly mapper: RR0CaseSummaryMapper

  constructor(cityService: CityService, readonly actions: ChronologyReplacerActions) {
    const rr0HttpDatasource = this.datasource = new RR0HttpDatasource(RR0Mapping.baseUrl, RR0Mapping.searchPath,
      cityService)
    const csvMapper = this.mapper = new RR0CaseSummaryMapper(rr0HttpDatasource.baseUrl, rr0HttpDatasource.searchPath,
      rr0HttpDatasource.authors)
    this.fileDatasource = new RR0FileDatasource(csvMapper)
  }
}
