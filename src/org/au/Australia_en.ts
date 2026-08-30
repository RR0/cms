import { CountryMessages } from "../country/CountryMessages.js"
import { newSouthWales_en } from "./region/nsw/NewSouthWalesMessages_en.js"
import { southAustralia_en } from "./region/sa/SouthAustraliaMessages_en.js"
import { victoria_en } from "./region/vic/VictoriaMessages_en.js"
import { westernAustralia_en } from "./region/wa/WesternAustraliaMessages_en.js"

export const australia_en = CountryMessages.create("Australia",
  {
    nsw: newSouthWales_en,
    sa: southAustralia_en,
    wa: westernAustralia_en,
    vic: victoria_en
  }
)
