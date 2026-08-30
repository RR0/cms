import { jacksonMessages } from "./Jackson/JacksonMessages.js"
import { HindsCityCode } from "./HindsCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const hindsMessages_fr = DepartmentMessages.create("Comté de Hinds", {
  [HindsCityCode.Jackson]: jacksonMessages
})
