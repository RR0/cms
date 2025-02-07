import { portsmouthMessages } from "./Portsmouth/PortsmouthMessages.js"
import { RockinghamCityCode } from "./RockinghamCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const rockinghamMessages_en = DepartmentMessages.create("Rockingham County", {
  [RockinghamCityCode.Portsmouth]: portsmouthMessages
})
