import { Place } from "@rr0/place"
import { AinCityCode } from "../AinCityCode.js"
import { ain } from "../Ain.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const hautevilleLompnes = City.create(String(AinCityCode.HautevilleLompnes), ain,
  Place.fromDMS("45°58′45″N,5°36′19″E"))
