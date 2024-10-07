import { MarneCityCode } from "./MarneCityCode.js"
import { reimsMessages } from "./Reims/ReimsMessages.js"
import { DepartmentMessages } from "../../../../../country/index.js"

export const marneMessages = DepartmentMessages.create("Marne", {
  [MarneCityCode.Reims]: reimsMessages
})
