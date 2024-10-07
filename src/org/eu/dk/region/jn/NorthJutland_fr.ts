import { NorthJutlandCityCode } from "./NorthJutlandCityCode"
import { aalborgMessages } from "./aalborg/AalborgMessages"
import { NorthJutlandMessages } from "./NorthJutlandMessages"
import { DepartmentMessages } from "../../../../country"

const northJutlandCityMessages: NorthJutlandMessages = {
  [NorthJutlandCityCode.Aalborg]: aalborgMessages
}
export const northJutland_fr = DepartmentMessages.create("Jutland du Nord", northJutlandCityMessages)
