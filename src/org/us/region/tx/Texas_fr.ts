import { RegionMessages } from "../../../country/index.js"
import { tarrant_fr } from "./tarrant/Tarrant_fr.js"
import { houstonCityCode } from "./houston/Houston.js"
import { houstonMessages } from "./houston/HoustonMessages.js"
import { OrganizationKind } from "../../../../../../data/src/org/OrganizationKind"

const texasCityMessages = {
  [houstonCityCode]: houstonMessages
}
export const texas_fr = RegionMessages.create("Texas", {
    tarrant: tarrant_fr
  }
)
texas_fr[OrganizationKind.city] = texasCityMessages
