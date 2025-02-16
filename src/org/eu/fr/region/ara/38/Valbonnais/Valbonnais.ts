import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere"
import { City } from "../../../../../../country"

export const valbonnais = City.create(String(IsereCityCode.Valbonnais), isere, Place.fromDMS("44°54′03″N,5°54′18″E"))
