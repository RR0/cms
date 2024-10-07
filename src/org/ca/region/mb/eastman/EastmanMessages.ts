import { EastmanCityCode } from "./EastmanCityCode"
import { sundownessages } from "./sundown/SundownMessages"
import { DepartmentMessages } from "../../../../country"

export const eastmanMessages = DepartmentMessages.create("Eastman", {
  [EastmanCityCode.Sundown]: sundownessages
})
