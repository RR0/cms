import { Place } from "@rr0/place"
import { OiseCityCode } from "../OiseCityCode.js"
import { oise } from "../Oise"
import { City } from "../../../../../../country"

export const neuillyEnThelle = City.create(String(OiseCityCode.NeuillyEnThelle), oise,
  Place.fromDMS("49°13′28″N,2°17′10″E"))
