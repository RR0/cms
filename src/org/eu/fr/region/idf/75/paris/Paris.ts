import { Place } from "@rr0/place"
import { ParisCityCode } from "../ParisCityCode.js"
import { City } from "../../../../../../country/index.js"
import { parisDep } from "../ParisDep.js"

export const parisCity = City.create(String(ParisCityCode.Paris), parisDep, Place.fromDMS("48° 51′ 24″N, 2° 21′ 07″E"))
