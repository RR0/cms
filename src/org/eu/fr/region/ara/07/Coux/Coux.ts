import { Place } from "@rr0/place"
import { ArdecheCityCode } from "../ArdecheCityCode.js"
import { ardeche } from "../Ardeche.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const coux = City.create(String(ArdecheCityCode.Coux), ardeche, Place.fromDMS("44°44′06″N,4°37′16″E"))
