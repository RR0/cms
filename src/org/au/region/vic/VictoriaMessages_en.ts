import { melbourneVicMessages } from "./melbourne/index.js"
import { VictoriaCityCode } from "./VictoriaCityCode.js"
import { DepartmentMessages } from "../../../country/index.js"

export const victoria_en = DepartmentMessages.create("Victoria", {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
})
