import { BaseOvniFranceCaseSummaryRR0Mapper } from "./BaseOvniFranceCaseSummaryRR0Mapper.js"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { BaseOvniFranceHttpDatasource } from "./BaseOvniFranceHttpDatasource.js"
import { RR0CaseMapping } from "../rr0/index.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { CityService, DepartmentService } from "../../../org"

export const baseOvniFranceDatasource = new BaseOvniFranceHttpDatasource()

export class BaseOvniFranceRR0Mapping implements RR0CaseMapping<BaseOvniFranceCaseSummary> {

  readonly datasource: BaseOvniFranceHttpDatasource
  readonly mapper: BaseOvniFranceCaseSummaryRR0Mapper

  constructor(cityService: CityService, departmentService: DepartmentService,
              readonly actions: ChronologyReplacerActions) {
    const datasource = this.datasource = baseOvniFranceDatasource
    this.mapper = new BaseOvniFranceCaseSummaryRR0Mapper(
      departmentService, cityService,
      datasource.baseUrl, datasource.copyright, datasource.authors
    )
  }
}

export const baseOvniFranceSortComparator
  = (c1: BaseOvniFranceCaseSummary, c2: BaseOvniFranceCaseSummary) => c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
