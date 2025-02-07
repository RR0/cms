import { minneapolisMessages } from "./Minneapolis/MinneapolisMessages.js"
import { HennepinCityCode } from "./HennepinCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const hennepinMessages_fr = DepartmentMessages.create("Comté de Hennepin", {
  [HennepinCityCode.Minneapolis]: minneapolisMessages
})
