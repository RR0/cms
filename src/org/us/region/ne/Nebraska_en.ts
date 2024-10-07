import { RegionMessages } from "../../../country/index.js"
import { scottsBluff_en } from "./ScottsBluff/ScottsBluff_en.js"
import { NebraskaCountyCode } from "./NebraskaCountyCode.js"

export const nebraska_en = RegionMessages.create("Nebraska", {
    [NebraskaCountyCode.Scottsbluff]: scottsBluff_en
  }
)
