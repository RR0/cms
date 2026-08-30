import { NorthJutlandCityCode } from "./NorthJutlandCityCode.js"
import { aalborgMessages } from "./aalborg/AalborgMessages.js"
import { NorthJutlandMessages } from "./NorthJutlandMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

const northJutlandCityMessages: NorthJutlandMessages = {
  [NorthJutlandCityCode.Aalborg]: aalborgMessages
}
export const northJutland_fr = DepartmentMessages.create("Jutland du Nord", northJutlandCityMessages)
