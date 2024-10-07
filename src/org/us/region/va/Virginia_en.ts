import { RegionMessages } from "../../../country"
import { arlington_en } from "./arlington/Arlington_en"
import { OrganizationKind } from "../../../Organization"
import { bristolCityCode } from "./bristol/Bristol"
import { bristolMessages } from "./bristol/BristolMessages"

export const virginia_en = RegionMessages.create("Virginia state", {
  arlington: arlington_en
})
virginia_en[OrganizationKind.city] = {
  [bristolCityCode]: bristolMessages
}
