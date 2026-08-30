import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { arlington_en } from "./arlington/Arlington_en.js"
import { bristolCityCode } from "./bristol/Bristol.js"
import { bristolMessages } from "./bristol/BristolMessages.js"
import { OrganizationKind } from "@rr0/data"

export const virginia_en = RegionMessages.create("Virginia state", {
  arlington: arlington_en
})
virginia_en[OrganizationKind.city] = {
  [bristolCityCode]: bristolMessages
}
