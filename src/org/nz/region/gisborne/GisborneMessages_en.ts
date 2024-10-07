import { gisborneCityMessages } from "./gisborne/GisborneMessages"
import { GisborneCityCode } from "./GisborneCityCode"
import { DepartmentMessages } from "../../../country"

export const gisborneMessages_en = new DepartmentMessages(["Gisborne District", "East Coast", "Eastland"], {
  [GisborneCityCode.Gisborne]: gisborneCityMessages
})
