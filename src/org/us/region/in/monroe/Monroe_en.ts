import { bloomingtonMessages } from "./bloomington/BloomingtonMessages"
import { MonroeCityCode } from "./MonroeCityCode"
import { DepartmentMessages } from "../../../../country"

export const monroe_en = DepartmentMessages.create("Monroe County", {
  [MonroeCityCode.Bloomington]: bloomingtonMessages
})
