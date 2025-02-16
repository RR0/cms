import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere"
import { City } from "../../../../../../country"

export const meylan = City.create(String(IsereCityCode.Meylan), isere, Place.fromDMS("45°12′33″N,5°46′48″E"))
