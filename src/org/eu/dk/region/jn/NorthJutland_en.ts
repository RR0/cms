import { NorthJutlandCityCode } from "./NorthJutlandCityCode.js"
import { NorthJutlandMessages } from "./NorthJutlandMessages.js"
import { aalborgMessages } from "./aalborg/AalborgMessages.js"
import { DepartmentMessages } from "../../../../country/index.js"

const northJutlandCityMessages: NorthJutlandMessages = {
  [NorthJutlandCityCode.Aalborg]: aalborgMessages
}
export const northJutland_en = DepartmentMessages.create("North Jutland", northJutlandCityMessages)
