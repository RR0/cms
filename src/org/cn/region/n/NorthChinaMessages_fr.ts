import { RegionMessages } from "../../../country"
import { NorthChinaDepartementCode } from "./NorthChinaDepartmentCode"
import { hebeiMessages_fr } from "./ji/HebeiMessages_fr"

export const northChinaMessages_fr = new RegionMessages(["Chine du Nord"], {
    [NorthChinaDepartementCode.ji]: hebeiMessages_fr
  }
)
