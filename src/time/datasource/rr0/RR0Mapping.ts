import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper.js"
import { RR0HttpDatasource } from "./RR0HttpDatasource.js"
import { cityService } from "../../../org/index.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { RR0CaseMapping } from "./RR0CaseMapping.js"
import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { RR0FileDatasource } from "./RR0FileDatasource.js"

export const rr0HttpDatasource = new RR0HttpDatasource(new URL("https://rr0.org"), "time", cityService)
const csvMapper = new RR0CaseSummaryMapper(rr0HttpDatasource.baseUrl, rr0HttpDatasource.searchPath,
  rr0HttpDatasource.authors)
export const rr0FileDatasource = new RR0FileDatasource(csvMapper)

export const rr0Mapper = new RR0CaseSummaryMapper(rr0HttpDatasource.baseUrl, rr0HttpDatasource.copyright,
  rr0HttpDatasource.authors)

export class RR0Mapping implements RR0CaseMapping<RR0CaseSummary> {

  constructor(
    readonly actions: ChronologyReplacerActions, readonly datasource = rr0HttpDatasource,
    readonly mapper = rr0Mapper, readonly backupDatasource = rr0FileDatasource
  ) {
  }
}
