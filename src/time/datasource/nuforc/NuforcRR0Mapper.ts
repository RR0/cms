import assert from "assert"
import { CaseMapper } from "../CaseMapper.js"
import { NuforcCaseSummary } from "./NuforcCaseSummary.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { NuforcCountry } from "./NuforcCountry.js"
import { RR0CaseSummary } from "../rr0/RR0CaseSummary.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { NuforcShape } from "./NuforcShape.js"
import { CityService } from "../../../org/country/index.js"
import { australia } from "../../../org/au/Australia.js"
import { brazil } from "../../../org/br/Brazil.js"
import { canada } from "../../../org/ca/Canada.js"
import { colombia } from "../../../org/co/Colombia.js"
import { dominicanRepublic } from "../../../org/do/DominicanRepublic.js"
import { germany } from "../../../org/eu/de/Germany.js"
import { india } from "../../../org/in/India.js"
import { peru } from "../../../org/pe/Peru.js"
import { philippines } from "../../../org/ph/Philippines.js"
import { mexico } from "../../../org/mx/Mexico.js"
import { newZealand } from "../../../org/nz/NewZealand.js"
import { seychelles } from "../../../org/sc/Seychelles.js"
import { southKorea } from "../../../org/kr/SouthKorea.js"
import { uk } from "../../../org/uk/Uk.js"
import { usa } from "../../../org/us/Usa.js"
import { algeria } from "../../../org/dz/Algeria.js"
import { panama } from "../../../org/pa/Panama.js"
import { RR0SourceType, Source } from "@rr0/data"
import { OrganizationPlace } from "../../../place/OrganizationPlace.js"
import { CountryService } from "../../../org/country/CountryService.js"

export class NuforcRR0Mapper implements CaseMapper<HtmlRR0Context, NuforcCaseSummary, RR0CaseSummary> {

  static readonly countryMap: { [key in NuforcCountry]: string } = {
    Algeria: algeria.id,
    Australia: australia.id,
    Brazil: brazil.id,
    Canada: canada.id,
    Colombia: colombia.id,
    "Dominican Republic": dominicanRepublic.id,
    Germany: germany.id,
    India: india.id,
    Panama: panama.id,
    Peru: peru.id,
    Philippines: philippines.id,
    Mexico: mexico.id,
    "New Zealand": newZealand.id,
    Seychelles: seychelles.id,
    "South Korea": southKorea.id,
    "United Kingdom": uk.id,
    Unspecified: "?",
    USA: usa.id
  }
  readonly translations: { [key in NuforcShape]: string } = {
    [NuforcShape.Circle]: "d'un cercle",
    [NuforcShape.Disk]: "d'un disque",
    [NuforcShape.Light]: "d'une lumière",
    [NuforcShape.Cylinder]: "d'un cylindre",
    [NuforcShape.Cigar]: "d'un d'un cigare",
    [NuforcShape.Chevron]: "d'un chevron",
    [NuforcShape.Cone]: "d'un cône",
    [NuforcShape.Cube]: "d'un cube",
    [NuforcShape.Changing]: "de forme changeante",
    [NuforcShape.Diamond]: "d'un diamant",
    [NuforcShape.Flash]: "d'un éclair lumineux",
    [NuforcShape.Formation]: "d'une formation",
    [NuforcShape.Orb]: "d'un orbe",
    [NuforcShape.Oval]: "d'une forme ovale",
    [NuforcShape.Other]: "d'une forme indéterminée",
    [NuforcShape.Rectangle]: "d'un rectangle",
    [NuforcShape.Sphere]: "d'un sphère",
    [NuforcShape.Star]: "d'une étoile",
    [NuforcShape.Teardrop]: "d'un goutte",
    [NuforcShape.Triangle]: "d'un triangle",
    [NuforcShape.Unknown]: "d'une forme inconnue"
  }

  constructor(
    protected cityService: CityService, protected countryService: CountryService,
    readonly baseUrl: string, readonly copyright: string, readonly authors: string[]) {
  }

  getDescription(c: NuforcCaseSummary): string {
    const description = ["observation"]
    description.push(this.translations[c.shape])
    return description.join(", ")
  }

  map(context: HtmlRR0Context, sourceCase: NuforcCaseSummary, sourceTime: Date): RR0CaseSummary {
    const caseSource: Source<RR0SourceType> = {
      previousSourceRefs: [],
      events: [],
      url: sourceCase.url,
      title: "cas n° " + sourceCase.id,
      authors: this.authors,
      publication: {publisher: this.copyright, time: EdtfDate.fromDate(sourceTime)}
    }
    assert.ok(sourceCase.country, `NUFORC country code is ${sourceCase.country}`)
    const countryCode = NuforcRR0Mapper.countryMap[sourceCase.country]
    assert.ok(countryCode, `Could not find RR0 country to map from NUFORC code ${countryCode}`)
    const country = this.countryService.getById(countryCode)
    assert.ok(country, `Could not find country "${countryCode}"`)
    const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(sourceCase.city)
    const placeName = placeItems[1]
    const city = this.cityService.find(context, placeName, undefined)
    assert.ok(city,
      `Could not find city of name "${placeName}" in state "${sourceCase.state}" of country "${countryCode}"`)
    return {
      type: "event",
      eventType: "sighting",
      events: [],
      time: sourceCase.time,
      place: new OrganizationPlace(city),
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }
}
