import { Place } from "@rr0/place"
import { HauteGaronneCityCode } from "../HauteGaronneCityCode.js"
import { hauteGaronne } from "../HauteGaronne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const loudet = City.create(String(HauteGaronneCityCode.Loudet), hauteGaronne,
  Place.fromDMS("43°08′57″N,0°34′24″E"))
