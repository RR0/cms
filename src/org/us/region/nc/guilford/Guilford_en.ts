import { DepartmentMessages } from "../../../../country/index.js"
import { GuilfordCityCode } from "./GuilfordCityCode.js"
import { greensboroMessages } from "./greensboro/GreensboroMessages.js"

export const guilford_en = DepartmentMessages.create("Guilford", {
    [GuilfordCityCode.Greensboro]: greensboroMessages
  }
)
