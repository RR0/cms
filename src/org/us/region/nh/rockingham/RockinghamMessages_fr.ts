import { portsmouthMessages } from "./Portsmouth/PortsmouthMessages.js"
import { RockinghamCityCode } from "./RockinghamCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const rockinghamMessages_fr = DepartmentMessages.create("Comté de Rockingham", {
  [RockinghamCityCode.Portsmouth]: portsmouthMessages
})
