import { galesburgMessages } from "./galesburg/GalesburgMessages"
import { KalamazooCityCode } from "./KalamazooCityCode"
import { DepartmentMessages } from "../../../../country"

export const kalamazooMessages_en = DepartmentMessages.create("Kalamazoo County", {
  [KalamazooCityCode.Galesburg]: galesburgMessages
})
