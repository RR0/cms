import { lasVegasMessages } from "./LasVegas/LasVegasMessages.js"
import { ClarkCityCode } from "./ClarkCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const clarkMessages_fr = DepartmentMessages.create("Comté de Clark", {
  [ClarkCityCode.LasVegas]: lasVegasMessages
})
