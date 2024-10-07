import { dunmoreNswMessages } from "./dunmore/index.js"
import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode.js"
import { RegionMessages } from "../../../country/index.js"

export const newSouthWales_en = RegionMessages.create("New South Wales", {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
})
