import { tarrant_en } from "./tarrant/Tarrant_en.js"
import { RegionMessages } from "../../../country/index.js"
import { houstonMessages } from "./houston/HoustonMessages.js"
import { houstonCityCode } from "./houston/Houston.js"
import { OrganizationKind } from "../../../OrganizationKind"

const texasCityMessages = {
  [houstonCityCode]: houstonMessages
}
export const texas_en = RegionMessages.create("Texas", {
    tarrant: tarrant_en
  }
)
texas_en[OrganizationKind.city] = texasCityMessages
