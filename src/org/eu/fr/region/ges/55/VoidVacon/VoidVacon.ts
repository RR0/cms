import { Place } from "@rr0/place"
import { MeuseCityCode } from "../MeuseCityCode.js"
import { meuse } from "../Meuse"
import { City } from "../../../../../../country"

export const voidVacon = City.create(String(MeuseCityCode.VoidVacon), meuse, Place.fromDMS("48° 41′ 19″N, 5° 37′ 08″E"))
