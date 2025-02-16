import { VienneCityCode } from "./VienneCityCode.js"
import { lavouxMessages } from "./Lavoux/LavouxMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"

type DepMessages = { [key in VienneCityCode]: OrganizationMessages }
export const vienneMessages = DepartmentMessages.create<DepMessages>("Vienne", {
  [VienneCityCode.Lavoux]: lavouxMessages
})
