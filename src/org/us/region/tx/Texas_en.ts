import { tarrant_en } from "./tarrant/Tarrant_en"
import { RegionMessages } from "../../../country"
import { OrganizationKind } from "../../../Organization"
import { houstonMessages } from "./houston/HoustonMessages"
import { houstonCityCode } from "./houston/Houston"

const texasCityMessages = {
  [houstonCityCode]: houstonMessages
}
export const texas_en = RegionMessages.create("Texas", {
    tarrant: tarrant_en
  }
)
texas_en[OrganizationKind.city] = texasCityMessages
