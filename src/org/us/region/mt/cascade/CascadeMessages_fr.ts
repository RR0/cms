import { greatFallsMessages } from "./GreatFalls/GreatFallsMessages.js"
import { CascadeCityCode } from "./CascadeCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const cascadeMessages_fr = DepartmentMessages.create("Comté de Cascade", {
  [CascadeCityCode.GreatFalls]: greatFallsMessages
})
