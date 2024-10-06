import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode"
import { dunmoreNswMessages } from "./dunmore"
import { RegionMessages } from "../../../country"

export const newSouthWales_fr = RegionMessages.create("Nouvelle-Galles du Sud", {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
})
