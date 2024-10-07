import { melbourneVicMessages } from "./melbourne/index.js"
import { VictoriaCityCode } from "./VictoriaCityCode.js"
import { RegionMessages } from "../../../country/index.js"

export const victoria_en = RegionMessages.create("Victoria", {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
})
