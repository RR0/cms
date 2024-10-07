import { bloomingtonMessages } from "./bloomington/BloomingtonMessages.js"
import { MonroeCityCode } from "./MonroeCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const monroe_en = DepartmentMessages.create("Monroe County", {
  [MonroeCityCode.Bloomington]: bloomingtonMessages
})
