import { centralWestMessages_fr } from "./region/cw/CentralWestMessages_fr"
import { southEastMessages_fr } from "./region/se/SouthEastMessages_fr"
import { CountryMessages } from "../country"

export const brazil_fr = CountryMessages.create("Brésil", {
  cw: centralWestMessages_fr,
  se: southEastMessages_fr
})
