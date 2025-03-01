import { Place } from "@rr0/place"
import { LoireCityCode } from "../LoireCityCode.js"
import { loire } from "../Loire.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const roanne = City.create(String(LoireCityCode.Roanne), loire, Place.fromDMS("46°02′12″N,4°04′08″E"))
