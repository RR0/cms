import { DepartmentMessages, RegionMessages } from "../../../../country"
import { pieksamakiMessages_en } from "./Pieksamaki/PieksamakiMessages_en"
import { SouthSavoDepartmentCode } from "./SouthSavoDepartmentCode"

export const southSavo_en = new RegionMessages<DepartmentMessages>(["South Savo", "Southern Savonia"], {
  [SouthSavoDepartmentCode.Pieksamaki]: pieksamakiMessages_en
})
