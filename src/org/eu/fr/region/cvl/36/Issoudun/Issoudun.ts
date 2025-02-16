import { Place } from "@rr0/place"
import { IndreCityCode } from "../IndreCityCode.js"
import { indre } from "../Indre"
import { City } from "../../../../../../country"

export const issoudun = City.create(String(IndreCityCode.Issoudun), indre, Place.fromDMS("46°57′39″N,1°59′40″E"))
