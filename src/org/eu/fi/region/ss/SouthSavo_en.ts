import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { pieksamakiMessages_en } from "./Pieksamaki/PieksamakiMessages_en.js"
import { SouthSavoDepartmentCode } from "./SouthSavoDepartmentCode.js"

export const southSavo_en = new RegionMessages(["South Savo", "Southern Savonia"], {
  [SouthSavoDepartmentCode.Pieksamaki]: pieksamakiMessages_en
})
