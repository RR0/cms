import { southWhitleyMessages } from "./SouthWhitley/SouthWhitleyMessages.js"
import { WhitleyCityCode } from "./WhitleyCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const whitley_fr = DepartmentMessages.create("Comté de Whitley", {
  [WhitleyCityCode.SouthWhitley]: southWhitleyMessages
})
