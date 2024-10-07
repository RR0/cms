import { VictoriaCityCode } from "./VictoriaCityCode.js"
import { RegionMessages } from "../../../country/index.js"
import { melbourneVicMessages } from "./melbourne/index.js"

export const victoria_fr = RegionMessages.create("Victoria", {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
})
