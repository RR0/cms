import { Place } from "@rr0/place"
import { LoireCityCode } from "../LoireCityCode.js"
import { loire } from "../Loire"
import { City } from "../../../../../../country"

export const roanne = City.create(String(LoireCityCode.Roanne), loire, Place.fromDMS("46°02′12″N,4°04′08″E"))
