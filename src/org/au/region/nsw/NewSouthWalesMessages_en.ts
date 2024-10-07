import { dunmoreNswMessages } from "./dunmore"
import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode"
import { RegionMessages } from "../../../country"

export const newSouthWales_en = RegionMessages.create("New South Wales", {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
})
