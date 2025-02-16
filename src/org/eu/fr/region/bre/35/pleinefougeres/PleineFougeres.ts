import { Place } from "@rr0/place"
import { IlleEtVilaineCityCode } from "../IlleEtVilaineCityCode.js"
import { illeEtVilaine } from "../IlleEtVilaine"
import { City } from "../../../../../../country"

export const pleineFougeres = City.create(String(IlleEtVilaineCityCode.PleineFougeres), illeEtVilaine,
  Place.fromDMS("48°32′01″N,1°33′51″O"))
