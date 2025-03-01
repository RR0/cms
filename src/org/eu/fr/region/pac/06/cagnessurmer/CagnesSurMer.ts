import { Place } from "@rr0/place"
import { AlpesMaritimesCityCode } from "../AlpesMaritimesCityCode.js"
import { alpesMaritimes } from "../AlpesMaritimes.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const cagnesSurMer = City.create(String(AlpesMaritimesCityCode.CagnesSurMer), alpesMaritimes,
  Place.fromDMS("43°39′52″N,7°08′56″E"))
