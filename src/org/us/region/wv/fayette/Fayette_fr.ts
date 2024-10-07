import { mountHopeMessages } from "./MountHope/MountHopeMessages.js"
import { FayetteCityCode } from "./FayetteCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const fayette_fr = DepartmentMessages.create("Comté de Fayette", {
  [FayetteCityCode.MountHope]: mountHopeMessages
})
