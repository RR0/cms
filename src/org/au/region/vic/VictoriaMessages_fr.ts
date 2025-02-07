import { VictoriaCityCode } from "./VictoriaCityCode.js"
import { DepartmentMessages } from "../../../country/index.js"
import { melbourneVicMessages } from "./melbourne/index.js"

export const victoria_fr = DepartmentMessages.create("Victoria", {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
})
