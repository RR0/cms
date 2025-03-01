import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { NorthChinaDepartementCode } from "./NorthChinaDepartmentCode.js"
import { hebeiMessages_fr } from "./ji/HebeiMessages_fr.js"

export const northChinaMessages_cn = new RegionMessages(["华北", "Huáběi"], {
    [NorthChinaDepartementCode.ji]: hebeiMessages_fr
  }
)
