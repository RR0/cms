import { City } from "../../../../../country/index.js"
import { Place } from "@rr0/place"
import { HebeiCityCode } from "../HebeiCityCode.js"
import { hebei } from "../Hebei.js"

export const tianjin = City.create(HebeiCityCode.Tianjin, hebei, Place.fromDMS("39°08′01″N,117°12′19″E"))
