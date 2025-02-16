import { Place } from "@rr0/place"
import { IndreEtLoireCityCode } from "../IndreEtLoireCityCode.js"
import { indreEtLoire } from "../IndreEtLoire"
import { City } from "../../../../../../country"

export const monts37 = City.create(String(IndreEtLoireCityCode.Monts), indreEtLoire,
  Place.fromDMS("47°16′41″N,0°37′31″E"))
