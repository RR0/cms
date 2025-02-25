import { UrecatRR0Mapper } from "./UrecatRR0Mapper.js"
import { UrecatHttpDatasource } from "./UrecatHttpDatasource.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { RR0CaseMapping } from "../rr0"
import { UrecatCase } from "./UrecatCase"
import { CMSContext } from "../../../CMSContext"

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
