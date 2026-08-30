import { jacksonMessages } from "./Jackson/JacksonMessages.js"
import { HindsCityCode } from "./HindsCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const hindsMessages_en = DepartmentMessages.create("Hinds County", {
  [HindsCityCode.Jackson]: jacksonMessages
})
