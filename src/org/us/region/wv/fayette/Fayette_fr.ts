import { mountHopeMessages } from "./MountHope/MountHopeMessages"
import { FayetteCityCode } from "./FayetteCityCode"
import { DepartmentMessages } from "../../../../country"

export const fayette_fr = DepartmentMessages.create("Comté de Fayette", {
  [FayetteCityCode.MountHope]: mountHopeMessages
})