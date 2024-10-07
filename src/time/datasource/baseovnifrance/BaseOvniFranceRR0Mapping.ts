import { BaseOvniFranceCaseSummaryRR0Mapper } from "./BaseOvniFranceCaseSummaryRR0Mapper.js"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { BaseOvniFranceHttpDatasource } from "./BaseOvniFranceHttpDatasource.js"
import { cityService, departmentService } from "../../../org/index.js"
import { RR0CaseMapping } from "../rr0/index.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"

export const baseOvniFranceDatasource = new BaseOvniFranceHttpDatasource()

export const baseOvniFranceRR0Mapper = new BaseOvniFranceCaseSummaryRR0Mapper(
  departmentService, cityService,
  baseOvniFranceDatasource.baseUrl, baseOvniFranceDatasource.copyright, baseOvniFranceDatasource.authors
)

const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
export const baseOvniFranceRR0Mapping: RR0CaseMapping<BaseOvniFranceCaseSummary> = {
  datasource: baseOvniFranceDatasource,
  mapper: baseOvniFranceRR0Mapper,
  actions
}

export const baseOvniFranceSortComparator
  = (c1: BaseOvniFranceCaseSummary, c2: BaseOvniFranceCaseSummary) => c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
