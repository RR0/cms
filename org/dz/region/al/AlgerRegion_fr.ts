import { AlgerCityCode } from "./AlgerCityCode"
import { alger_fr } from "./Alger/Alger_fr"
import { DepartmentMessages } from "../../../country"

export const algerRegion_fr = DepartmentMessages.create("Wilaya d'Alger", {
  [AlgerCityCode.Alger]: alger_fr
})
