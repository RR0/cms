import { UrecatRR0Mapper } from "./UrecatRR0Mapper.js"
import { UrecatHttpDatasource } from "./UrecatHttpDatasource.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"
import { UrecatCase } from "./UrecatCase.js"
import { CMSContext } from "../../../CMSContext.js"

export const urecatDatasource = new UrecatHttpDatasource(new URL("https://ufologie.patrickgross.org"), "ce3")

export class UrecatRR0Mapping implements RR0CaseMapping<UrecatCase> {

  datasource = urecatDatasource
  mapper: UrecatRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }

  init(build: CMSContext): this {
    this.mapper = new UrecatRR0Mapper(build.cityService, build.countryService, urecatDatasource.baseUrl,
      urecatDatasource.copyright, urecatDatasource.authors)
    return this
  }
}
