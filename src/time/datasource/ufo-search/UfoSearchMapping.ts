import { UfoSearchHttpDatasource } from "./UfoSearchHttpDatasource.js"
import { UfoSearchFileDatasource } from "./UfoSearchFileDatasource.js"
import { UfoSearchCaseRR0Mapper } from "./UfoSearchCaseRR0Mapper.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { RR0CaseMapping } from "../rr0"
import { UfoSearchCase } from "./UfoSearchCase"
import { CityService } from "../../../org"

export const ufoSearchHttpDatasource = new UfoSearchHttpDatasource("https://www.ufo-search.com", "timeline/search.html")

export class UfoSearchRR0Mapping implements RR0CaseMapping<UfoSearchCase> {

  datasource = ufoSearchHttpDatasource
  backupDatasource: UfoSearchFileDatasource
  mapper: UfoSearchCaseRR0Mapper

  constructor(cityService: CityService, readonly actions: ChronologyReplacerActions) {
    this.mapper = new UfoSearchCaseRR0Mapper(cityService, ufoSearchHttpDatasource.baseUrl,
      ufoSearchHttpDatasource.copyright, ufoSearchHttpDatasource.authors)
    this.backupDatasource = new UfoSearchFileDatasource("time/datasource/ufo-search/majestic.json",
      this.mapper)
  }
}
