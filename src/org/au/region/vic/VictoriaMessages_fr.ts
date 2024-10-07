import { VictoriaCityCode } from "./VictoriaCityCode"
import { RegionMessages } from "../../../country"
import { melbourneVicMessages } from "./melbourne"

export const victoria_fr = RegionMessages.create("Victoria", {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
})
