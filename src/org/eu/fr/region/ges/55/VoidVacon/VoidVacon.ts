import { Place } from "@rr0/place"
import { MeuseCityCode } from "../MeuseCityCode.js"
import { meuse } from "../Meuse.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const voidVacon = City.create(String(MeuseCityCode.VoidVacon), meuse, Place.fromDMS("48° 41′ 19″N, 5° 37′ 08″E"))
