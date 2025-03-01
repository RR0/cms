import { Place } from "@rr0/place"
import { LoireAtlantiqueCityCode } from "../LoireAtlantiqueCityCode.js"
import { loireAtlantique } from "../LoireAtlantique.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const reze = City.create(String(LoireAtlantiqueCityCode.Reze), loireAtlantique,
  Place.fromDMS("47° 10′ 38″N,1°32′57″W"))
