import { wissousMessages } from "./wissous/WissousMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country"
import { EssonneCityCode } from "./EssonneCityCode"

type EssonneCityMessagesList = { [key in EssonneCityCode]: CityMessages }
const hautsDeSeineCityMessages: EssonneCityMessagesList = {
  [EssonneCityCode.Wissous]: wissousMessages
}
export const essonneMessages = DepartmentMessages.create<EssonneCityMessagesList>("Essonne", hautsDeSeineCityMessages)
