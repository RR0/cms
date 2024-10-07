import { FederalDistrictCityCode } from "./FederalDistrictCityCode.js"
import { brasiliaMessages_fr } from "./70000-000/BrasiliaMessages_fr.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const federalDistrictMessages_fr = DepartmentMessages.create("District fédéral", {
  [FederalDistrictCityCode.Brasilia]: brasiliaMessages_fr
})
