import { CountryCode } from "../../../data/src/org/country/CountryCode.js"
import { CountryMessages } from "./country/CountryMessages.js"

export type CountryMessagesList
  = { [key in CountryCode]: CountryMessages<any> }
