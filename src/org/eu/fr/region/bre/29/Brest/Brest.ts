import { Place } from "@rr0/place"
import { FinistereCityCode } from "../FinistereCityCode.js"
import { City } from "../../../../../../country/index.js"
import { finistere } from "../Finistere.js"

export const brest = new City(FinistereCityCode.Brest, finistere, [Place.fromDMS("47°52′34″N,3°55′04″W")])
