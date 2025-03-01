import { Place } from "@rr0/place"
import { TarnCityCode } from "../TarnCityCode.js"
import { tarn } from "../Tarn.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const castelnauDeMontmiral = City.create(String(TarnCityCode.CastelnauDeMontmiral), tarn,
  Place.fromDMS("43°57′59″N,1°49′18″E"))
