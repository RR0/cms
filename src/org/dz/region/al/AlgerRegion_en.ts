import { AlgerCityCode } from "./AlgerCityCode.js"
import { alger_en } from "./Alger/Alger_en.js"
import { DepartmentMessages } from "../../../country/index.js"

export const algerRegion_en = DepartmentMessages.create("Algiers Province", {
  [AlgerCityCode.Alger]: alger_en
})
