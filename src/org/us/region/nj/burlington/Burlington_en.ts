import { DepartmentMessages } from "../../../../country/index.js"
import { BurlingtonCityCode } from "./BurlingtonCityCode.js"
import { willingboroMessages } from "./willingboro/WillingboroMessages.js"

export const burlington_en = DepartmentMessages.create("Burlington County", {
    [BurlingtonCityCode.Willingboro]: willingboroMessages
  }
)
