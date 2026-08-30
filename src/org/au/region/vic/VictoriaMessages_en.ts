import { melbourneVicMessages } from "./melbourne/MelbourneMessages.js"
import { VictoriaCityCode } from "./VictoriaCityCode.js"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"

export const victoria_en = DepartmentMessages.create("Victoria", {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
})
