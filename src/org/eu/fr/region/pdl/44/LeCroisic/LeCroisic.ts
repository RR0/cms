import { Place } from "@rr0/place"
import { LoireAtlantiqueCityCode } from "../LoireAtlantiqueCityCode.js"
import { loireAtlantique } from "../LoireAtlantique.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const leCroisic = City.create(String(LoireAtlantiqueCityCode.LeCroisic), loireAtlantique,
  Place.fromDMS("47°17′33″N,2°31′15″O"))
