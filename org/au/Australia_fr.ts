import { CountryMessages } from "../country"
import { newSouthWales_fr, southAustralia_fr, victoria_fr, westernAustralia_fr } from "./region"
import { AustraliaRegionsMessages } from "./AustraliaRegionsMessages"

export const australia_fr = CountryMessages.create<AustraliaRegionsMessages>("Australie",
  {
    nsw: newSouthWales_fr,
    sa: southAustralia_fr,
    wa: westernAustralia_fr,
    vic: victoria_fr
  }
)
