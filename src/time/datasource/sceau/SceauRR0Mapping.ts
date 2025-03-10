import { SceauHttpDatasource } from "./SceauHttpDatasource.js"
import { RR0CaseMapping } from "../rr0/index.js"
import { SceauCaseSummary } from "./SceauCaseSummary.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { SceauCaseSummaryRR0Mapper } from "./SceauCaseSummaryRR0Mapper.js"
import { CMSContext } from "../../../CMSContext.js"

export const sceauDatasource = new SceauHttpDatasource(new URL("https://sceau-archives-ovni.org"))

export class SceauRR0Mapping implements RR0CaseMapping<SceauCaseSummary> {

  datasource = sceauDatasource
  mapper: SceauCaseSummaryRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }

  init(build: CMSContext) {
    this.mapper = new SceauCaseSummaryRR0Mapper(build.cityService, sceauDatasource.baseUrl,
      sceauDatasource.copyright, sceauDatasource.authors)
    return this
  }
}
