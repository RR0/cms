import { BaseOvniFranceCaseSummaryRR0Mapper } from "./BaseOvniFranceCaseSummaryRR0Mapper.js"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { BaseOvniFranceHttpDatasource } from "./BaseOvniFranceHttpDatasource.js"
import { RR0CaseMapping } from "../rr0/index.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { CMSContext } from "../../../CMSContext"

export const baseOvniFranceDatasource = new BaseOvniFranceHttpDatasource()

export class BaseOvniFranceRR0Mapping implements RR0CaseMapping<BaseOvniFranceCaseSummary> {

  datasource: BaseOvniFranceHttpDatasource
  mapper: BaseOvniFranceCaseSummaryRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }

  init(build: CMSContext) {
    const datasource = this.datasource = baseOvniFranceDatasource
    this.mapper = new BaseOvniFranceCaseSummaryRR0Mapper(
      build.departmentService, build.cityService,
      datasource.baseUrl, datasource.copyright, datasource.authors
    )
    return this
  }
}

export const baseOvniFranceSortComparator
  = (c1: BaseOvniFranceCaseSummary, c2: BaseOvniFranceCaseSummary) => c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
