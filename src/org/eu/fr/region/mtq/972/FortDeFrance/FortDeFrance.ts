import { Place } from "@rr0/place"
import { MartiniqueCityCode } from "../MartiniqueCityCode.js"
import { City } from "../../../../../../country/index.js"
import { martinique972 } from "../Martinique.js"

export const fortDeFrance = City.create(MartiniqueCityCode.FortDeFrance, martinique972,
  Place.fromDMS("14°36′48″N,61°03′52″W"))
