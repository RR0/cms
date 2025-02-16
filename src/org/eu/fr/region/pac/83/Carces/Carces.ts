import { Place } from "@rr0/place"
import { VarCityCode } from "../VarCityCode.js"
import { Var } from "../Var"
import { City } from "../../../../../../country"

export const carces = City.create(String(VarCityCode.Carces), Var, Place.fromDMS("43°28′35″N,6°11′01″E"))
