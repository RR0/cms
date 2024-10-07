import { sainsRichaumontMessages } from "./SainsRichaumont/SainsRichaumontMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/index.js"
import { AisneCityCode } from "./AisneCityCode.js"

type AisneCityMessagesList = { [key in AisneCityCode]: CityMessages }
const aisneCityMessages: AisneCityMessagesList = {
  [AisneCityCode.SainsRichaumont]: sainsRichaumontMessages
}
export const aisneMessages = DepartmentMessages.create<AisneCityMessagesList>("Aisne", aisneCityMessages)
