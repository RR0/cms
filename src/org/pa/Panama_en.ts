import { CountryMessages } from "../country/index.js"
import { PanamaRegionCode } from "./region/PanamaRegionCode.js"
import { PanamaMessages } from "./PanamaMessages.js"
import { algerRegion_en } from "./region/al/AlgerRegion_en.js"

export const panama_en = CountryMessages.create<PanamaMessages>("Panama", {
    [PanamaRegionCode.al]: algerRegion_en
  }
)
