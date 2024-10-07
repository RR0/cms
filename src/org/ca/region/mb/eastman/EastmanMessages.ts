import { EastmanCityCode } from "./EastmanCityCode.js"
import { sundownessages } from "./sundown/SundownMessages.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const eastmanMessages = DepartmentMessages.create("Eastman", {
  [EastmanCityCode.Sundown]: sundownessages
})
