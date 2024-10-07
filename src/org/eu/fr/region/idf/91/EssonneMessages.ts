import { wissousMessages } from "./wissous/WissousMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/index.js"
import { EssonneCityCode } from "./EssonneCityCode.js"

type EssonneCityMessagesList = { [key in EssonneCityCode]: CityMessages }
const hautsDeSeineCityMessages: EssonneCityMessagesList = {
  [EssonneCityCode.Wissous]: wissousMessages
}
export const essonneMessages = DepartmentMessages.create<EssonneCityMessagesList>("Essonne", hautsDeSeineCityMessages)
