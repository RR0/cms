import { VictoriaCityCode } from "./VictoriaCityCode.js"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"
import { melbourneVicMessages } from "./melbourne/MelbourneMessages.js"

export const victoria_fr = DepartmentMessages.create("Victoria", {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
})
