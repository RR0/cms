import { Place } from "@rr0/place"
import { IndreEtLoireCityCode } from "../IndreEtLoireCityCode.js"
import { indreEtLoire } from "../IndreEtLoire.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const chambourgSurIndre = City.create(String(IndreEtLoireCityCode.ChambourgSurIndre), indreEtLoire,
  Place.fromDMS("47°10′56″N,0°58′05″E"))
