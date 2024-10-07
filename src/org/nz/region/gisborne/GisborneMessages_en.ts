import { gisborneCityMessages } from "./gisborne/GisborneMessages.js"
import { GisborneCityCode } from "./GisborneCityCode.js"
import { DepartmentMessages } from "../../../country/index.js"

export const gisborneMessages_en = new DepartmentMessages(["Gisborne District", "East Coast", "Eastland"], {
  [GisborneCityCode.Gisborne]: gisborneCityMessages
})
