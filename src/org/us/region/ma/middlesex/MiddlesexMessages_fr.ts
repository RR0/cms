import { cambridgeMessages } from "./cambridge/CambridgeMessages.js"
import { MiddlesexCityCode } from "./MiddlesexCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const middlesexMessages_fr = DepartmentMessages.create("Comté de Middlesex", {
  [MiddlesexCityCode.Cambridge]: cambridgeMessages
})
