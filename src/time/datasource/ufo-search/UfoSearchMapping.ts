import { UfoSearchHttpDatasource } from "./UfoSearchHttpDatasource.js"
import { UfoSearchFileDatasource } from "./UfoSearchFileDatasource.js"
import { UfoSearchCaseRR0Mapper } from "./UfoSearchCaseRR0Mapper.js"
import { cityService } from "../../../org/index.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"

export const ufoSearchHttpDatasource = new UfoSearchHttpDatasource("https://www.ufo-search.com", "timeline/search.html")

export const ufoSearchCaseRR0Mapper = new UfoSearchCaseRR0Mapper(cityService, ufoSearchHttpDatasource.baseUrl,
  ufoSearchHttpDatasource.copyright, ufoSearchHttpDatasource.authors)

export const ufoSearchFileDatasource = new UfoSearchFileDatasource("time/datasource/ufo-search/majestic.json",
  ufoSearchCaseRR0Mapper)

const actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}
export const ufoSearchRR0Mapping = {datasource: ufoSearchHttpDatasource, mapper: ufoSearchCaseRR0Mapper, actions}
