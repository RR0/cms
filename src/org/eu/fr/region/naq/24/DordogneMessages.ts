import { eymetMessages } from "./Eymet/EymetMessages"
import { DordogneCityCode } from "./DordogneCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country"

type DepMessages = { [key in DordogneCityCode]: CityMessages }
export const dordogneMessages = DepartmentMessages.create<DepMessages>("Dordogne", {
  [DordogneCityCode.Eymet]: eymetMessages
})