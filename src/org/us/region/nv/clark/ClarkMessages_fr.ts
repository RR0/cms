import { lasVegasMessages } from "./LasVegas/LasVegasMessages.js"
import { ClarkCityCode } from "./ClarkCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const clarkMessages_fr = DepartmentMessages.create("Comté de Clark", {
  [ClarkCityCode.LasVegas]: lasVegasMessages
})
