import { minneapolisMessages } from "./Minneapolis/MinneapolisMessages.js"
import { HennepinCityCode } from "./HennepinCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const hennepinMessages_en = DepartmentMessages.create("Hennepin County", {
  [HennepinCityCode.Minneapolis]: minneapolisMessages
})
