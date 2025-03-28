import { SeineEtMarneCityCode } from "./SeineEtMarneCityCode.js"
import { sivryCourtryMessages } from "./SivryCourtry/SivryCourtryMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/index.js"

const seineEtMarneCityMessages: { [key in SeineEtMarneCityCode]: CityMessages } = {
  [SeineEtMarneCityCode.SivryCourtry]: sivryCourtryMessages
}
export const seineEtMarneMessages = DepartmentMessages.create("Seine-et-Marne", seineEtMarneCityMessages)
