import { Place } from "@rr0/place"
import { LoireAtlantiqueCityCode } from "../LoireAtlantiqueCityCode.js"
import { loireAtlantique } from "../LoireAtlantique.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const lorouxBottereau = City.create(String(LoireAtlantiqueCityCode.LorouxBottereau), loireAtlantique,
  Place.fromDMS("47°14′20″N,1°20′52″O"))
