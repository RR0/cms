import { Place } from "@rr0/place"
import { IndreEtLoireCityCode } from "../IndreEtLoireCityCode.js"
import { indreEtLoire } from "../IndreEtLoire.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const monts37 = City.create(String(IndreEtLoireCityCode.Monts), indreEtLoire,
  Place.fromDMS("47°16′41″N,0°37′31″E"))
