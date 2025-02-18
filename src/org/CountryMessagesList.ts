import { CountryMessages } from "./country/CountryMessages.js"
import { CountryCode } from "@rr0/data"

export type CountryMessagesList
  = { [key in CountryCode]: CountryMessages<any> }
