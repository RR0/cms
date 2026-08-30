import { portsmouthMessages } from "./Portsmouth/PortsmouthMessages.js"
import { RockinghamCityCode } from "./RockinghamCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const rockinghamMessages_en = DepartmentMessages.create("Rockingham County", {
  [RockinghamCityCode.Portsmouth]: portsmouthMessages
})
