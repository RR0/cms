import { Place } from "@rr0/place"
import { City } from "../../../../country/region/department/city/City.js"
import { sanDiego } from "./SanDiego.js"

export function sanDiegoCity(zipCode: string, place: Place) {
  return new City(zipCode, sanDiego, [place])
}
