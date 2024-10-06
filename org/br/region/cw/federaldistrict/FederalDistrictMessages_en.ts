import { FederalDistrictCityCode } from "./FederalDistrictCityCode"
import { brasiliaMessages_en } from "./70000-000/BrasiliaMessages_en"
import { DepartmentMessages } from "../../../../country"

export const federalDistrictMessages_en = DepartmentMessages.create("Federal District", {
  [FederalDistrictCityCode.Brasilia]: brasiliaMessages_en
})
