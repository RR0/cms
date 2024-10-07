import { southWhitleyMessages } from "./SouthWhitley/SouthWhitleyMessages.js"
import { WhitleyCityCode } from "./WhitleyCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const whitley_en = DepartmentMessages.create("Whitley County", {
  [WhitleyCityCode.SouthWhitley]: southWhitleyMessages
})
