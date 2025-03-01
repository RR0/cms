import { Place } from "@rr0/place"
import { AlpesMaritimesCityCode } from "../AlpesMaritimesCityCode.js"
import { alpesMaritimes } from "../AlpesMaritimes.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const cannes06 = City.create(String(AlpesMaritimesCityCode.Cannes), alpesMaritimes,
  Place.fromDMS("43° 33′ 05″N, 7° 00′ 46″E"))
