import { Place } from "@rr0/place"
import { HauteGaronneCityCode } from "../HauteGaronneCityCode.js"
import { hauteGaronne } from "../HauteGaronne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const stPlancard = City.create(String(HauteGaronneCityCode.StPlancard), hauteGaronne,
  Place.fromDMS("43°10′16″N,0°34′30″E"))
