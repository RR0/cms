import { kootenaysMessages_en } from "./rdck/KootenaysMessages_en"
import { RegionMessages } from "../../../country"
import { BritishColumbiaDepartmentCode } from "./BritishColumbiaDepartmentCode"

export const britishColumbiaMessages_en = RegionMessages.create(
  "British Columbia",
  {
    [BritishColumbiaDepartmentCode.kootenays]: kootenaysMessages_en
  }
)