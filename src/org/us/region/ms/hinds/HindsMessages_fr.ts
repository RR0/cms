import { jacksonMessages } from "./Jackson/JacksonMessages.js"
import { HindsCityCode } from "./HindsCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const hindsMessages_fr = DepartmentMessages.create("Comté de Hinds", {
  [HindsCityCode.Jackson]: jacksonMessages
})
