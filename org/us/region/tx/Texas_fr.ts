import { RegionMessages } from "../../../country"
import { tarrant_fr } from "./tarrant/Tarrant_fr"
import { houstonCityCode } from "./houston/Houston"
import { houstonMessages } from "./houston/HoustonMessages"
import { OrganizationKind } from "../../../Organization"

const texasCityMessages = {
  [houstonCityCode]: houstonMessages
}
export const texas_fr = RegionMessages.create("Texas", {
    tarrant: tarrant_fr
  }
)
texas_fr[OrganizationKind.city] = texasCityMessages
