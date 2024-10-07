import { RegionMessages } from "../../../country/index.js"
import { pinellasMessages_en } from "./pinellas/PinellasMessages_en.js"

export const florida_en = RegionMessages.create(
  "Florida",
  {
    pinellas: pinellasMessages_en
  }
)
