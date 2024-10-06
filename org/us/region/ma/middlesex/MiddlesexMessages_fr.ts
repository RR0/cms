import { cambridgeMessages } from "./cambridge/CambridgeMessages"
import { MiddlesexCityCode } from "./MiddlesexCityCode"
import { DepartmentMessages } from "../../../../country"

export const middlesexMessages_fr = DepartmentMessages.create("Comté de Middlesex", {
  [MiddlesexCityCode.Cambridge]: cambridgeMessages
})
