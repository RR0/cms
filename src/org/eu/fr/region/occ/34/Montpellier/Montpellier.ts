import { Place } from "@rr0/place"
import { HeraultCityCode } from "../HeraultCityCode.js"
import { herault } from "../Herault"
import { City } from "../../../../../../country"

export const montpellier = City.create(String(HeraultCityCode.Montpellier), herault,
  Place.fromDMS("43°52′03″N,0°06′27″W"))
