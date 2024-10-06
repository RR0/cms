import { melbourneVicMessages } from "./melbourne"
import { VictoriaCityCode } from "./VictoriaCityCode"
import { RegionMessages } from "../../../country"

export const victoria_en = RegionMessages.create("Victoria", {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
})
