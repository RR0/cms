import { AlgerCityCode } from "./AlgerCityCode.js"
import { alger_fr } from "./Alger/Alger_fr.js"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"

export const algerRegion_fr = DepartmentMessages.create("Wilaya d'Alger", {
  [AlgerCityCode.Alger]: alger_fr
})
