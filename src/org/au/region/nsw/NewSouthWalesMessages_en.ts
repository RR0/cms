import { dunmoreNswMessages } from "./dunmore/index.js"
import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode.js"
import { DepartmentMessages } from "../../../country/index.js"

export const newSouthWales_en = DepartmentMessages.create("New South Wales", {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
})
