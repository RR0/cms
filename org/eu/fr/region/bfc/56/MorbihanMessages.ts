import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { MorbihanCityCode } from "./MorbihanCityCode"
import { locmineMessages } from "./Locmine/LocmineMessages"
import { CityMessages } from "../../../../../country"

type DepMessages = { [key in MorbihanCityCode]: CityMessages }
export const morbihanMessages = DepartmentMessages.create<DepMessages>("Morbihan", {
  [MorbihanCityCode.Locmine]: locmineMessages
})
