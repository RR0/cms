import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { MayenneCityCode } from "./MayenneCityCode"
import { CityMessages } from "../../../../../country"
import { chateauGontierMessages } from "./ChateauGontier/ChateauGontierMessages"

type DepMessages = { [key in MayenneCityCode]: CityMessages }
export const mayenneMessages = DepartmentMessages.create<DepMessages>("Mayenne", {
  [MayenneCityCode.ChateauGontier]: chateauGontierMessages
})