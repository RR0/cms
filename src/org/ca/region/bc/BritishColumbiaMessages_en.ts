import { kootenaysMessages_en } from "./rdck/KootenaysMessages_en.js"
import { RegionMessages } from "../../../country/index.js"
import { BritishColumbiaDepartmentCode } from "./BritishColumbiaDepartmentCode.js"

export const britishColumbiaMessages_en = RegionMessages.create(
  "British Columbia",
  {
    [BritishColumbiaDepartmentCode.kootenays]: kootenaysMessages_en
  }
)
