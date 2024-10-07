import { centralWestMessages_en } from "./region/cw/CentralWestMessages_en.js"
import { southEastMessages_en } from "./region/se/SouthEastMessages_en.js"
import { CountryMessages } from "../country/index.js"

export const brazil_en = CountryMessages.create("Brazil", {
  cw: centralWestMessages_en,
  se: southEastMessages_en
})
