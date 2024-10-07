import { RegionMessages } from "../../../country/index.js"
import { sanDiegoMessages_en } from "./sandiego/SanDiegoMessages_en.js"

export const california_en = RegionMessages.create(
  "California",
  {
    sandiego: sanDiegoMessages_en
  }
)
