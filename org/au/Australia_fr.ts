import { CountryMessages } from "../country"
import { AustraliaRegionCode, newSouthWales_fr, southAustralia_fr, victoria_fr, westernAustralia_fr } from "./region"

export const australia_fr = CountryMessages.create("Australie",
  {
    [AustraliaRegionCode.nsw]: newSouthWales_fr,
    sa: southAustralia_fr,
    wa: westernAustralia_fr,
    vic: victoria_fr
  }
)
