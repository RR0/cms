import { Place } from "@rr0/place"
import { AinCityCode } from "../AinCityCode.js"
import { ain } from "../Ain"
import { City } from "../../../../../../country"

export const hautevilleLompnes = City.create(String(AinCityCode.HautevilleLompnes), ain,
  Place.fromDMS("45°58′45″N,5°36′19″E"))
