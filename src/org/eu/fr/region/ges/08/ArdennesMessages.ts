import { ArdennesCityCode } from "./ArdennesCityCode"
import { revinMessages } from "./Revin/RevinMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country"

type DepMessages = { [key in ArdennesCityCode]: CityMessages }
export const ardennesMessages = DepartmentMessages.create<DepMessages>("Ardennes", {
  [ArdennesCityCode.Revin]: revinMessages
})