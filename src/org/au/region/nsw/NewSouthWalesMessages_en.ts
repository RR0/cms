import { dunmoreNswMessages } from "./dunmore/DunmoreMessages.js"
import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode.js"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"

export const newSouthWales_en = DepartmentMessages.create("New South Wales", {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
})
