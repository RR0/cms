import { GeipanHttpDatasource } from "./GeipanHttpDatasource.js"
import { GeipanCaseSummaryRR0Mapper } from "./GeipanCaseSummaryRR0Mapper.js"
import { GeipanFileDatasource } from "./GeipanFileDatasource.js"

import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { ChronologyReplacerActions, RR0CaseMapping } from "../../../../../../time/index.js"
import { CityService } from "../../../../../country"

export const geipanHttpDatasource = new GeipanHttpDatasource(new URL("https://geipan.fr"), "fr/recherche/cas")
export const geipanFileDatasource = new GeipanFileDatasource("org/eu/fr/cnes/geipan/export_cas_pub_20210219111412.csv",
  "latin1")

export class GeipanRR0Mapping implements RR0CaseMapping<GeipanCaseSummary> {

  readonly datasource = geipanHttpDatasource
  readonly backupDatasource = geipanFileDatasource
  readonly mapper: GeipanCaseSummaryRR0Mapper

  constructor(cityService: CityService, readonly actions: ChronologyReplacerActions) {
    this.mapper = new GeipanCaseSummaryRR0Mapper(cityService, geipanHttpDatasource.baseUrl,
      geipanHttpDatasource.copyright, geipanHttpDatasource.authors)
  }
}
