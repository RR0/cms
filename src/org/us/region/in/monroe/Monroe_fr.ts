import { bloomingtonMessages } from "./bloomington/BloomingtonMessages.js"
import { MonroeCityCode } from "./MonroeCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const monroe_fr = DepartmentMessages.create("Comté de Monroe", {
  [MonroeCityCode.Bloomington]: bloomingtonMessages
})
