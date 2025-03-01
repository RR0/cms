import { Place } from "@rr0/place"
import { OiseCityCode } from "../OiseCityCode.js"
import { oise } from "../Oise.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const pontSainteMaxence = City.create(String(OiseCityCode.PontSainteMaxence), oise,
  Place.fromDMS("49° 18′ 07″ N, 2° 36′ 16″ E"))
