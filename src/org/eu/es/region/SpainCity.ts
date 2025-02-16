import { Department } from "../../../country/region/department/Department.js"
import { City } from "../../../country/index.js"
import { Place } from "@rr0/place"

export function spainCity(code: string, province: Department, place: Place): City {
  return new City(code, province, [place])
}
