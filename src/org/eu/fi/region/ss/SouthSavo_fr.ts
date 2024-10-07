import { RegionMessages } from "../../../../country"
import { pieksamakiMessages_fr } from "./Pieksamaki/PieksamakiMessages_fr"
import { SouthSavoDepartmentCode } from "./SouthSavoDepartmentCode"

export const southSavo_fr = new RegionMessages(["Savonie du Sud"], {
  [SouthSavoDepartmentCode.Pieksamaki]: pieksamakiMessages_fr
})
