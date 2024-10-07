import { RegionMessages } from "../../../../country"
import { pieksamakiMessages_en } from "./Pieksamaki/PieksamakiMessages_en"
import { SouthSavoDepartmentCode } from "./SouthSavoDepartmentCode"

export const southSavo_en = new RegionMessages(["South Savo", "Southern Savonia"], {
  [SouthSavoDepartmentCode.Pieksamaki]: pieksamakiMessages_en
})
