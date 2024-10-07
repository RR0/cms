import { Department } from "../../../country/region/department/Department"
import { City } from "../../../country"
import { Place } from "../../../../place/Place"

export function spainCity(code: string, province: Department, place: Place): City {
  return new City(code, province, [place])
}
