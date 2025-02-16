import { Place } from "@rr0/place"
import { HauteVienneCityCode } from "../HauteVienneCityCode.js"
import { hauteVienne } from "../HauteVienne"
import { City } from "../../../../../../country"

export const jabreilles = City.create(String(HauteVienneCityCode.Jabreilles), hauteVienne,
  Place.fromDMS("46°01′05″N,1°30′58″E"))
