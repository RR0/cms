import { NorthJutlandCityCode } from "./NorthJutlandCityCode"
import { NorthJutlandMessages } from "./NorthJutlandMessages"
import { aalborgMessages } from "./aalborg/AalborgMessages"
import { DepartmentMessages } from "../../../../country"

const northJutlandCityMessages: NorthJutlandMessages = {
  [NorthJutlandCityCode.Aalborg]: aalborgMessages
}
export const northJutland_en = DepartmentMessages.create("North Jutland", northJutlandCityMessages)
