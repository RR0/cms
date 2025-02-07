import { hebeiMessages_en } from "./ji/HebeiMessages_en"
import { RegionMessages } from "../../../country"
import { NorthChinaDepartementCode } from "./NorthChinaDepartmentCode"

export const northChinaMessages_en = new RegionMessages(["North China", "Northern China"], {
    [NorthChinaDepartementCode.ji]: hebeiMessages_en
  }
)
