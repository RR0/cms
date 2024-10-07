import { SussexCityCode } from "./SussexCityCode"
import { CityMessages, DepartmentMessages } from "../../../../country"

import { frantMessages } from "./frant/FrantMessages"

type SussexCityMessagesList = { [key in SussexCityCode]: CityMessages }
const sussexCityMessages: SussexCityMessagesList = {
  [SussexCityCode.Beira]: frantMessages
}
export const sussexMessages = DepartmentMessages.create<SussexCityMessagesList>("Sussex", sussexCityMessages)
