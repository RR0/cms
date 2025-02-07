import { lasVegasMessages } from "./LasVegas/LasVegasMessages.js"
import { ClarkCityCode } from "./ClarkCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const clarkMessages_en = DepartmentMessages.create("Clark County", {
  [ClarkCityCode.LasVegas]: lasVegasMessages
})
