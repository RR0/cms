import { Place } from "@rr0/place"
import { SommeCityCode } from "../SommeCityCode.js"
import { somme } from "../Somme"
import { City } from "../../../../../../country"

export const bernaville = City.create(String(SommeCityCode.Bernaville), somme, Place.fromDMS("50°07′56″N,2°09′52″E"))
