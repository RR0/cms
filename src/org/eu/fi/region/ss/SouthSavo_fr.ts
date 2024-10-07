import { RegionMessages } from "../../../../country/index.js"
import { pieksamakiMessages_fr } from "./Pieksamaki/PieksamakiMessages_fr.js"
import { SouthSavoDepartmentCode } from "./SouthSavoDepartmentCode.js"

export const southSavo_fr = new RegionMessages(["Savonie du Sud"], {
  [SouthSavoDepartmentCode.Pieksamaki]: pieksamakiMessages_fr
})
