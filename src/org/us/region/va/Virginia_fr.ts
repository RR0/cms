import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { arlington_fr } from "./arlington/Arlington_fr.js"
import { bristolCityCode } from "./bristol/Bristol.js"
import { bristolMessages } from "./bristol/BristolMessages.js"
import { OrganizationKind } from "@rr0/data"

export const virginia_fr = RegionMessages.create("État de Virginie", {
  arlington: arlington_fr
})
virginia_fr[OrganizationKind.city] = {
  [bristolCityCode]: bristolMessages
}
