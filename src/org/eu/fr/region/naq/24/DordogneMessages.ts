import { eymetMessages } from "./Eymet/EymetMessages.js"
import { DordogneCityCode } from "./DordogneCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/index.js"

type DepMessages = { [key in DordogneCityCode]: CityMessages }
export const dordogneMessages = DepartmentMessages.create<DepMessages>("Dordogne", {
  [DordogneCityCode.Eymet]: eymetMessages
})
