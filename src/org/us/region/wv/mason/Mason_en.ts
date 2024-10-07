import { DepartmentMessages } from "../../../../country/index.js"
import { MasonCityCode } from "./MasonCityCode.js"
import { pointPleasantMessages } from "./PointPleasant/PointPleasantMessages.js"

export const mason_en = DepartmentMessages.create("Fayette County", {
  [MasonCityCode.PointPleasant]: pointPleasantMessages
})
