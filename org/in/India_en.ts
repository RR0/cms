import { CountryMessages } from "../country"
import { IndiaMessages } from "./IndiaMessages"
import { maharashtraMessages } from "./region/mh/MaharashtraMessages"
import { telanganaMessages } from "./region/tg/TelanganaMessages"
import { IndiaRegionCode } from "./region/IndiaRegionCode"

export const india_en = CountryMessages.create<IndiaMessages>("India", {
    [IndiaRegionCode.mh]: maharashtraMessages,
    [IndiaRegionCode.tg]: telanganaMessages
  }
)
