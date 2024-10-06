import { CountryMessages } from "../country"
import { newSouthWales_en, southAustralia_en, victoria_en, westernAustralia_en } from "./region"
import { AustraliaRegionsMessages } from "./AustraliaRegionsMessages"

export const australia_en = CountryMessages.create<AustraliaRegionsMessages>("Australia",
  {
    nsw: newSouthWales_en,
    sa: southAustralia_en,
    wa: westernAustralia_en,
    vic: victoria_en
  }
)
