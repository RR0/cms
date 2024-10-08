import { RegionMessages } from "../../../country/index.js"
import { arlington_fr } from "./arlington/Arlington_fr.js"
import { OrganizationKind } from "../../../Organization.js"
import { bristolCityCode } from "./bristol/Bristol.js"
import { bristolMessages } from "./bristol/BristolMessages.js"

export const virginia_fr = RegionMessages.create("État de Virginie", {
  arlington: arlington_fr
})
virginia_fr[OrganizationKind.city] = {
  [bristolCityCode]: bristolMessages
}
