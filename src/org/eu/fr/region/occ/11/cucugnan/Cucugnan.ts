import { Place } from "@rr0/place"
import { AudeCityCode } from "../AudeCityCode.js"
import { aude } from "../Aude.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const cucugnan = City.create(String(AudeCityCode.Cucugnan), aude, Place.fromDMS("42°51′07″N,2°36′11″E"))
