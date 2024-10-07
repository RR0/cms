import { bonneyLakeMessages } from "./bonneylake/BonneyLakeMessages.js"
import { PierceCityCode } from "./PierceCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const pierceMessages_en = DepartmentMessages.create("Pierce County", {
  [PierceCityCode.BonneyLake]: bonneyLakeMessages
})
