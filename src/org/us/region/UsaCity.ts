import { Department } from "../../country/region/department/Department.js"
import { Place } from "@rr0/place"
import { City } from "../../country/region/department/city/City.js"

export function usaCity(code: string, county: Department, place: Place): City {
  return new City(code, county, [place])
}
