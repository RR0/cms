import { greatFallsMessages } from "./GreatFalls/GreatFallsMessages.js"
import { CascadeCityCode } from "./CascadeCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const cascadeMessages_en = DepartmentMessages.create("Cascade County", {
  [CascadeCityCode.GreatFalls]: greatFallsMessages
})
