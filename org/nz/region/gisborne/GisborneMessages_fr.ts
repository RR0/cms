import { gisborneCityMessages } from "./gisborne/GisborneMessages"
import { GisborneCityCode } from "./GisborneCityCode"
import { DepartmentMessages } from "../../../country"

export const gisborneMessages_fr = new DepartmentMessages(["Gisborne", "East Coast", "Eastland"], {
  [GisborneCityCode.Gisborne]: gisborneCityMessages
})
