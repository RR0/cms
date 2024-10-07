import { cambridgeMessages } from "./cambridge/CambridgeMessages.js"
import { MiddlesexCityCode } from "./MiddlesexCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const middlesexMessages_en = DepartmentMessages.create("Middlesex County", {
  [MiddlesexCityCode.Cambridge]: cambridgeMessages
})
