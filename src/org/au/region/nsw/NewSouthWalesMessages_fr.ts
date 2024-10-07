import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode.js"
import { dunmoreNswMessages } from "./dunmore/index.js"
import { RegionMessages } from "../../../country/index.js"

export const newSouthWales_fr = RegionMessages.create("Nouvelle-Galles du Sud", {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
})
