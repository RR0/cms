import { Place } from "@rr0/place"
import { DoubsCityCode } from "../DoubsCityCode.js"
import { doubs } from "../Doubs"
import { City } from "../../../../../../country"

export const ouhans = City.create(String(DoubsCityCode.Ouhans), doubs, Place.fromDMS("46° 59′ 57″ N, 6° 17′ 39″E"))
