import { hebeiMessages_en } from "./ji/HebeiMessages_en.js"
import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { NorthChinaDepartementCode } from "./NorthChinaDepartmentCode.js"

export const northChinaMessages_en = new RegionMessages(["North China", "Northern China"], {
    [NorthChinaDepartementCode.ji]: hebeiMessages_en
  }
)
