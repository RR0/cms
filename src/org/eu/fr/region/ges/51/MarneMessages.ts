import { MarneCityCode } from "./MarneCityCode"
import { reimsMessages } from "./Reims/ReimsMessages"
import { DepartmentMessages } from "../../../../../country"

export const marneMessages = DepartmentMessages.create("Marne", {
  [MarneCityCode.Reims]: reimsMessages
})
