import { GeipanHttpDatasource } from "./GeipanHttpDatasource.js"
import { GeipanCaseSummaryRR0Mapper } from "./GeipanCaseSummaryRR0Mapper.js"
import { GeipanFileDatasource } from "./GeipanFileDatasource.js"

import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { ChronologyReplacerActions, RR0CaseMapping } from "../../../../../../time/index.js"
import { CMSContext } from "../../../../../../CMSContext.js"

export const geipanHttpDatasource = new GeipanHttpDatasource(new URL("https://geipan.fr"), "fr/recherche/cas")
export const geipanFileDatasource = new GeipanFileDatasource("org/eu/fr/cnes/geipan/export_cas_pub_20210219111412.csv",
  "latin1")

export class GeipanRR0Mapping implements RR0CaseMapping<GeipanCaseSummary> {

  datasource = geipanHttpDatasource
  backupDatasource = geipanFileDatasource
  mapper: GeipanCaseSummaryRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }

  init(build: CMSContext) {
    this.mapper = new GeipanCaseSummaryRR0Mapper(build.cityService, geipanHttpDatasource.baseUrl,
      geipanHttpDatasource.copyright, geipanHttpDatasource.authors)
    return this
  }
}
