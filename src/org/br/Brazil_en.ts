import { centralWestMessages_en } from "./region/cw/CentralWestMessages_en"
import { southEastMessages_en } from "./region/se/SouthEastMessages_en"
import { CountryMessages } from "../country"

export const brazil_en = CountryMessages.create("Brazil", {
  cw: centralWestMessages_en,
  se: southEastMessages_en
})
