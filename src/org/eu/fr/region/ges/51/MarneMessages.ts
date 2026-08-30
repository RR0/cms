import { MarneCityCode } from "./MarneCityCode.js"
import { reimsMessages } from "./Reims/ReimsMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

export const marneMessages = DepartmentMessages.create("Marne", {
  [MarneCityCode.Reims]: reimsMessages
})
