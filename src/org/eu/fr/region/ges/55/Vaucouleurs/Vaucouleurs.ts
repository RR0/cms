import { Place } from "@rr0/place"
import { MeuseCityCode } from "../MeuseCityCode.js"
import { meuse } from "../Meuse.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const vaucouleurs = City.create(String(MeuseCityCode.Vaucouleurs), meuse, Place.fromDMS("48°36′09″N,5°39′57″E"))
