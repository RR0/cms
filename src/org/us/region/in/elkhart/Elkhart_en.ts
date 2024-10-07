import { elkhartMessages } from "./elkhart/ElkhartMessages"
import { ElkhartCityCode } from "./ElkhartCityCode"
import { DepartmentMessages } from "../../../../country"

export const elkhart_en = DepartmentMessages.create("Elkhart County", {
  [ElkhartCityCode.Elkhart]: elkhartMessages
})
