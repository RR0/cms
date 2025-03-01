import { Place } from "@rr0/place"
import { VarCityCode } from "../VarCityCode.js"
import { Var } from "../Var.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const carces = City.create(String(VarCityCode.Carces), Var, Place.fromDMS("43°28′35″N,6°11′01″E"))
