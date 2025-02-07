import { RegionMessages } from "../../../country"
import { NorthChinaDepartementCode } from "./NorthChinaDepartmentCode"
import { hebeiMessages_fr } from "./ji/HebeiMessages_fr"

export const northChinaMessages_cn = new RegionMessages(["华北", "Huáběi"], {
    [NorthChinaDepartementCode.ji]: hebeiMessages_fr
  }
)
