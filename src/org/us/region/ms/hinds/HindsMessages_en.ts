import { jacksonMessages } from "./Jackson/JacksonMessages.js"
import { HindsCityCode } from "./HindsCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const hindsMessages_en = DepartmentMessages.create("Hinds County", {
  [HindsCityCode.Jackson]: jacksonMessages
})
