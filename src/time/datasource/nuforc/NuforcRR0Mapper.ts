import assert from "assert"
import { CaseMapper } from "../CaseMapper"
import { NuforcCaseSummary } from "./NuforcCaseSummary"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { NuforcCountry } from "./NuforcCountry"
import { NamedPlace, RR0CaseSummary } from "../rr0/RR0CaseSummary"
import { TimeContext } from "../../TimeContext"
import { NuforcShape } from "./NuforcShape"
import { CityService } from "../../../org/country"
import { CountryService } from "../../../org/country/CountryService"
import { australia } from "../../../org/au/Australia"
import { brazil } from "../../../org/br/Brazil"
import { canada } from "../../../org/ca/Canada"
import { colombia } from "../../../org/co/Colombia"
import { dominicanRepublic } from "../../../org/do/DominicanRepublic"
import { germany } from "../../../org/eu/de/Germany"
import { india } from "../../../org/in/India"
import { peru } from "../../../org/pe/Peru"
import { philippines } from "../../../org/ph/Philippines"
import { mexico } from "../../../org/mx/Mexico"
import { newZealand } from "../../../org/nz/NewZealand"
import { seychelles } from "../../../org/sc/Seychelles"
import { southKorea } from "../../../org/kr/SouthKorea"
import { uk } from "../../../org/uk/Uk"
import { usa } from "../../../org/us/Usa"
import { Source } from "../../../source"
import { algeria } from "../../../org/dz/Algeria"
import { panama } from "../../../org/pa/Panama"

export class NuforcRR0Mapper implements CaseMapper<HtmlRR0SsgContext, NuforcCaseSummary, RR0CaseSummary> {

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

  map(context: HtmlRR0SsgContext, sourceCase: NuforcCaseSummary, sourceTime: Date): RR0CaseSummary {
    const caseSource: Source = {
      previousSourceRefs: [],
      events: [],
      url: sourceCase.url,
      title: "cas n° " + sourceCase.id,
      authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    }
    assert.ok(sourceCase.country, `NUFORC country code is ${sourceCase.country}`)
    const countryCode = NuforcRR0Mapper.countryMap[sourceCase.country]
    assert.ok(countryCode, `Could not find RR0 country to map from NUFORC code ${countryCode}`)
    const country = this.countryService.get(countryCode)
    assert.ok(country, `Could not find country "${countryCode}"`)
    const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(sourceCase.city)
    const placeName = placeItems[1]
    const city = this.cityService.find(context, placeName, undefined)
    assert.ok(city,
      `Could not find city of name "${placeName}" in state "${sourceCase.state}" of country "${countryCode}"`)
    const place: NamedPlace = {name: city.getTitle(context), place: city.places[0]}
    return {
      type: "sighting",
      events: [],
      time: sourceCase.time,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }
}