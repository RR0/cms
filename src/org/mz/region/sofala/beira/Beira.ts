import { sofala } from "../Sofala.js"
import { City } from "../../../../country/region/department/city/City.js"
import { Place } from "@rr0/place"

export const beiraCityCode = "beira"
export const beira = new City(beiraCityCode, sofala, [Place.fromDMS("19°50′00″S,34°51′00″E")])
