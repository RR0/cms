import { ParisCityCode } from "./ParisCityCode.js"
import { parisCityMessages } from "./paris/ParisMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/index.js"

const parisDepCityMessages: { [key in ParisCityCode]: CityMessages } = {
  [ParisCityCode.Paris]: parisCityMessages
}
export const parisDepMessages = DepartmentMessages.create("Paris", parisDepCityMessages)
