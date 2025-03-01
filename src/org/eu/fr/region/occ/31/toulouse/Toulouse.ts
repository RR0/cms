import { Place } from "@rr0/place"
import { HauteGaronneCityCode } from "../HauteGaronneCityCode.js"
import { hauteGaronne } from "../HauteGaronne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const toulouse = City.create(String(HauteGaronneCityCode.Toulouse), hauteGaronne,
  Place.fromDMS("43°36′16″N,1°26′38″E"))
