import { Place } from "@rr0/place"
import { TarnCityCode } from "../TarnCityCode.js"
import { tarn } from "../Tarn.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const albi = City.create(String(TarnCityCode.Albi), tarn, Place.fromDMS("43°55′44″N,2°08′47″E"))
