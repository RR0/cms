import { galesburgMessages } from "./galesburg/GalesburgMessages"
import { KalamazooCityCode } from "./KalamazooCityCode"
import { DepartmentMessages } from "../../../../country"

export const kalamazooMessages_fr = DepartmentMessages.create("Comté de Kalamazoo", {
  [KalamazooCityCode.Galesburg]: galesburgMessages
})
