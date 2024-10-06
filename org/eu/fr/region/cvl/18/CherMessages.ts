import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CherCityCode } from "./CherCityCode"
import { chateauneufSurCherMessages } from "./ChateauneufSurCher/ChateauneufSurCherMessages"
import { CityMessages } from "../../../../../country"

type DepMessages = { [key in CherCityCode]: CityMessages }
export const cherMessages = DepartmentMessages.create<DepMessages>("Cher", {
  [CherCityCode.ChateauneufSurCher]: chateauneufSurCherMessages
})
