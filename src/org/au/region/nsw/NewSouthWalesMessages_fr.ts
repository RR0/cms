import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode.js"
import { dunmoreNswMessages } from "./dunmore/index.js"
import { DepartmentMessages } from "../../../country/index.js"

export const newSouthWales_fr = DepartmentMessages.create("Nouvelle-Galles du Sud", {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
})
