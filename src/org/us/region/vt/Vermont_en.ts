import { rutlandCounty_en } from "./rutland/Rutland_en"
import { RegionMessages } from "../../../country"
import { UsaCountyCode } from "../UsaCountyCode"

export const vermont_en = RegionMessages.create("Vermont", {
  [UsaCountyCode.rutland]: rutlandCounty_en
})