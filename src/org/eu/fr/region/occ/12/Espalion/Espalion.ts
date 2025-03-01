import { Place } from "@rr0/place"
import { AveyronCityCode } from "../AveyronCityCode.js"
import { aveyron } from "../Aveyron.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const espalion = City.create(String(AveyronCityCode.Espalion), aveyron, Place.fromDMS("42°51′07″N,2°36′11″E"))
