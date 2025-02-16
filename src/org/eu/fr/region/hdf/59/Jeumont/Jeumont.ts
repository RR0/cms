import { Place } from "@rr0/place"
import { NordCityCode } from "../NordCityCode.js"
import { nord } from "../Nord"
import { City } from "../../../../../../country"

export const jeumont = City.create(String(NordCityCode.Jeumont), nord, Place.fromDMS("50°17′43″N,4°06′07″E"))
