import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper.js"
import { RR0HttpDatasource } from "./RR0HttpDatasource.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { RR0CaseMapping } from "./RR0CaseMapping.js"
import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { RR0FileDatasource } from "./RR0FileDatasource.js"
import { RR0Datasource } from "./RR0Datasource"
import { BuildContext } from "../../../BuildContext"

export class RR0Mapping implements RR0CaseMapping<RR0CaseSummary> {

  static baseUrl = new URL("https://rr0.org")
  static searchPath = "time"
  datasource: RR0Datasource
  backupDatasource: RR0FileDatasource
  mapper: RR0CaseSummaryMapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }

  init(build: BuildContext) {
    const rr0HttpDatasource = this.datasource = new RR0HttpDatasource(RR0Mapping.baseUrl, RR0Mapping.searchPath,
      build.cityService)
    const csvMapper = this.mapper = new RR0CaseSummaryMapper(rr0HttpDatasource.baseUrl, rr0HttpDatasource.searchPath,
      rr0HttpDatasource.authors)
    this.backupDatasource = new RR0FileDatasource(csvMapper)
    return this
  }
}
