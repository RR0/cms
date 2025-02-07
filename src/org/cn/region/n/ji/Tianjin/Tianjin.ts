import { City } from "../../../../../country/index.js"
import { Place } from "../../../../../../place/index.js"
import { HebeiCityCode } from "../HebeiCityCode"
import { hebei } from "../Hebei"

export const tianjin = City.create(HebeiCityCode.Tianjin, hebei, Place.fromDMS("39°08′01″N,117°12′19″E"))
