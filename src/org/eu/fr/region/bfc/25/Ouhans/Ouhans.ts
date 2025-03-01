import { Place } from "@rr0/place"
import { DoubsCityCode } from "../DoubsCityCode.js"
import { doubs } from "../Doubs.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const ouhans = City.create(String(DoubsCityCode.Ouhans), doubs, Place.fromDMS("46° 59′ 57″ N, 6° 17′ 39″E"))
