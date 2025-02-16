import { Place } from "@rr0/place"
import { City } from "../../../../../country/region/department/city/City.js"
import { nwp } from "./Nwp.js"

export function createCity(zipCode: string, place: Place): City {
  return new City(zipCode, nwp, [place])
}
