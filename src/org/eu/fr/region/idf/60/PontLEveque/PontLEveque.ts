import { Place } from "@rr0/place"
import { OiseCityCode } from "../OiseCityCode.js"
import { oise } from "../Oise"
import { City } from "../../../../../../country"

export const pontLEveque60 = City.create(String(OiseCityCode.PontLEveque), oise,
  Place.fromLocation(49.565278, 2.988611))
