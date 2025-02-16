import { Place } from "@rr0/place"
import { AriegeCityCode } from "../AriegeCityCode.js"
import { ariege } from "../Ariege"
import { City } from "../../../../../../country"

export const cos = City.create(String(AriegeCityCode.Cos), ariege, Place.fromDMS("42°51′07″N,2°36′11″E"))
