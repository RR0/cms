import { centralWestMessages_fr } from "./region/cw/CentralWestMessages_fr.js"
import { southEastMessages_fr } from "./region/se/SouthEastMessages_fr.js"
import { CountryMessages } from "../country/index.js"

export const brazil_fr = CountryMessages.create("Brésil", {
  cw: centralWestMessages_fr,
  se: southEastMessages_fr
})
