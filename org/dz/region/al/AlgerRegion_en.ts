import { AlgerCityCode } from "./AlgerCityCode"
import { alger_en } from "./Alger/Alger_en"
import { DepartmentMessages } from "../../../country"

export const algerRegion_en = DepartmentMessages.create("Algiers Province", {
  [AlgerCityCode.Alger]: alger_en
})
