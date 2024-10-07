import { rutlandCounty_en } from "./rutland/Rutland_en.js"
import { RegionMessages } from "../../../country/index.js"
import { UsaCountyCode } from "../UsaCountyCode.js"

export const vermont_en = RegionMessages.create("Vermont", {
  [UsaCountyCode.rutland]: rutlandCounty_en
})
