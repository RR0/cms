import { southWhitleyMessages } from "./SouthWhitley/SouthWhitleyMessages"
import { WhitleyCityCode } from "./WhitleyCityCode"
import { DepartmentMessages } from "../../../../country"

export const whitley_en = DepartmentMessages.create("Whitley County", {
  [WhitleyCityCode.SouthWhitley]: southWhitleyMessages
})
