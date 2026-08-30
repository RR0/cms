import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode.js"
import { dunmoreNswMessages } from "./dunmore/DunmoreMessages.js"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"

export const newSouthWales_fr = DepartmentMessages.create("Nouvelle-Galles du Sud", {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
})
