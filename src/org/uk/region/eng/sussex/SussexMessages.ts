import { SussexCityCode } from "./SussexCityCode.js"
import { CityMessages, DepartmentMessages } from "../../../../country/index.js"

import { frantMessages } from "./frant/FrantMessages.js"

type SussexCityMessagesList = { [key in SussexCityCode]: CityMessages }
const sussexCityMessages: SussexCityMessagesList = {
  [SussexCityCode.Beira]: frantMessages
}
export const sussexMessages = DepartmentMessages.create<SussexCityMessagesList>("Sussex", sussexCityMessages)
