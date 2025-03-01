import { Place } from "@rr0/place"
import { HautesPyreneesCityCode } from "../HautesPyreneesCityCode.js"
import { hautesPyrenees } from "../HautesPyrenees.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const tarbes = City.create(String(HautesPyreneesCityCode.Tarbes), hautesPyrenees,
  Place.fromDMS("43°13′51″N,0°04′21″E"))
