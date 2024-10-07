import { elkhartMessages } from "./elkhart/ElkhartMessages.js"
import { ElkhartCityCode } from "./ElkhartCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const elkhart_fr = DepartmentMessages.create("Comté d'Elkhart", {
  [ElkhartCityCode.Elkhart]: elkhartMessages
})
