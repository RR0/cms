import { FederalDistrictCityCode } from "./FederalDistrictCityCode"
import { brasiliaMessages_fr } from "./70000-000/BrasiliaMessages_fr"
import { DepartmentMessages } from "../../../../country"

export const federalDistrictMessages_fr = DepartmentMessages.create("District fédéral", {
  [FederalDistrictCityCode.Brasilia]: brasiliaMessages_fr
})
