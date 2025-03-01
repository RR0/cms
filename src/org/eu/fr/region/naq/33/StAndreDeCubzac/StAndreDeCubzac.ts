import { Place } from "@rr0/place"
import { GirondeCityCode } from "../GirondeCityCode.js"
import { gironde } from "../Gironde.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const stAndreDeCubzac = City.create(String(GirondeCityCode.SaintAndreDeCubzac), gironde,
  Place.fromDMS("44°59′44″N,0°26′41″O"))
