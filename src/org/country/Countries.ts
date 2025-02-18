import { algeria } from "../dz/Algeria"
import { CountryCode } from "../../../../data/src/org/country/CountryCode"
import { australia } from "../au/index.js"
import { brazil } from "../br/Brazil"
import { canada } from "../ca/Canada"
import { china } from "../cn/China"
import { colombia } from "../co/Colombia"
import { germany } from "../eu/de/Germany"
import { denmark } from "../eu/dk/Denmark"
import { dominicanRepublic } from "../do/DominicanRepublic"
import { spain } from "../eu/es/Spain"
import { finland } from "../eu/fi/Finland"
import { france } from "../eu/fr/France"
import { israel } from "../il/Israel"
import { india } from "../in/India"
import { mexico } from "../mx/Mexico"
import { mozambique } from "../mz/Mozambique"
import { newZealand } from "../nz/NewZealand"
import { panama } from "../pa/Panama"
import { peru } from "../pe/Peru"
import { philippines } from "../ph/Philippines"
import { poland } from "../eu/pl/Poland"
import { russia } from "../ru/Russia"
import { seychelles } from "../sc/Seychelles"
import { southKorea } from "../kr/SouthKorea"
import { taiwan } from "../tw/Taiwan"
import { tunisia } from "../tn/Tunisia"
import { uk } from "../uk/Uk"
import { usa } from "../us/Usa"
import { CmsCountry } from "./CmsCountry"
import { georgia } from "../ge/Georgia"

export const countries: CmsCountry[] = [
  algeria,
  new CmsCountry(CountryCode.ar),
  new CmsCountry(CountryCode.at),
  australia,
  new CmsCountry(CountryCode.be),
  brazil,
  canada,
  new CmsCountry(CountryCode.ch),
  new CmsCountry(CountryCode.cl),
  china,
  colombia,
  new CmsCountry(CountryCode.cy),
  georgia,
  germany,
  denmark,
  dominicanRepublic,
  spain,
  finland,
  france,
  new CmsCountry(CountryCode.gr),
  new CmsCountry(CountryCode.hu),
  new CmsCountry(CountryCode.ie),
  israel,
  india,
  new CmsCountry(CountryCode.ir),
  new CmsCountry(CountryCode.it),
  new CmsCountry(CountryCode.jp),
  new CmsCountry(CountryCode.ma),
  mexico,
  mozambique,
  new CmsCountry(CountryCode.nl),
  new CmsCountry(CountryCode.no),
  newZealand,
  panama,
  peru,
  philippines,
  poland,
  new CmsCountry(CountryCode.pt),
  new CmsCountry(CountryCode.ro),
  russia,
  new CmsCountry(CountryCode.sa),
  new CmsCountry(CountryCode.se),
  seychelles,
  southKorea,
  new CmsCountry(CountryCode.tr),
  taiwan,
  tunisia,
  new CmsCountry(CountryCode.ua),
  uk,
  usa,
  new CmsCountry(CountryCode.ve),
  new CmsCountry(CountryCode.za)
]
