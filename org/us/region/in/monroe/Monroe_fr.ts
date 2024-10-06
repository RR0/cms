import { bloomingtonMessages } from "./bloomington/BloomingtonMessages"
import { MonroeCityCode } from "./MonroeCityCode"
import { DepartmentMessages } from "../../../../country"

export const monroe_fr = DepartmentMessages.create("Comté de Monroe", {
  [MonroeCityCode.Bloomington]: bloomingtonMessages
})
