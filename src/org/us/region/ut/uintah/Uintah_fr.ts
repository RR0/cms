import { UintahCityCode } from "./UintahCityCode"
import { DepartmentMessages } from "../../../../country"
import { skinwalker_fr } from "./skinwalker/Skinwalker_fr"

export const uintah_fr = DepartmentMessages.create("Comté d'Uintah", {
  [UintahCityCode.Skinwalker]: skinwalker_fr
})