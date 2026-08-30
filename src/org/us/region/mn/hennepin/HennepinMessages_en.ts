import { minneapolisMessages } from "./Minneapolis/MinneapolisMessages.js"
import { HennepinCityCode } from "./HennepinCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const hennepinMessages_en = DepartmentMessages.create("Hennepin County", {
  [HennepinCityCode.Minneapolis]: minneapolisMessages
})
