import { Place } from "@rr0/place"
import { GersCityCode } from "../GersCityCode.js"
import { gers } from "../Gers.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const condom = City.create(String(GersCityCode.Condom), gers, Place.fromDMS("43°57′30″N,0°22′25″E"))
