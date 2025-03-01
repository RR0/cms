import { algeria } from "../dz/Algeria.js"
import { CountryCode } from "@rr0/data"
import { australia } from "../au/index.js"
import { brazil } from "../br/Brazil.js"
import { canada } from "../ca/Canada.js"
import { china } from "../cn/China.js"
import { colombia } from "../co/Colombia.js"
import { germany } from "../eu/de/Germany.js"
import { denmark } from "../eu/dk/Denmark.js"
import { dominicanRepublic } from "../do/DominicanRepublic.js"
import { spain } from "../eu/es/Spain.js"
import { finland } from "../eu/fi/Finland.js"
import { france } from "../eu/fr/France.js"
import { israel } from "../il/Israel.js"
import { india } from "../in/India.js"
import { mexico } from "../mx/Mexico.js"
import { mozambique } from "../mz/Mozambique.js"
import { newZealand } from "../nz/NewZealand.js"
import { panama } from "../pa/Panama.js"
import { peru } from "../pe/Peru.js"
import { philippines } from "../ph/Philippines.js"
import { poland } from "../eu/pl/Poland.js"
import { russia } from "../ru/Russia.js"
import { seychelles } from "../sc/Seychelles.js"
import { southKorea } from "../kr/SouthKorea.js"
import { taiwan } from "../tw/Taiwan.js"
import { tunisia } from "../tn/Tunisia.js"
import { uk } from "../uk/Uk.js"
import { usa } from "../us/Usa.js"
import { CmsCountry } from "./CmsCountry.js"
import { georgia } from "../ge/Georgia.js"
import { japan } from "../jp/Japan.js"

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
  japan,
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
