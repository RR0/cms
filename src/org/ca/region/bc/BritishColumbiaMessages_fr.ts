import { kootenaysMessages_fr } from "./rdck/KootenaysMessages_fr"
import { RegionMessages } from "../../../country"
import { BritishColumbiaDepartmentCode } from "./BritishColumbiaDepartmentCode"

export const britishColumbiaMessages_fr = RegionMessages.create(
  "Colombie Britannique",
  {
    [BritishColumbiaDepartmentCode.kootenays]: kootenaysMessages_fr
  }
)