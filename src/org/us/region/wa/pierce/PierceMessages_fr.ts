import { bonneyLakeMessages } from "./bonneylake/BonneyLakeMessages"
import { PierceCityCode } from "./PierceCityCode"
import { DepartmentMessages } from "../../../../country"

export const pierceMessages_fr = DepartmentMessages.create("Comté de Pierce", {
  [PierceCityCode.BonneyLake]: bonneyLakeMessages
})
