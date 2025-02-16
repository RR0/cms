import { Place } from "@rr0/place"
import { IndreEtLoireCityCode } from "../IndreEtLoireCityCode.js"
import { indreEtLoire } from "../IndreEtLoire"
import { City } from "../../../../../../country"

export const blere = City.create(String(IndreEtLoireCityCode.Blere), indreEtLoire,
  Place.fromDMS("47°19′33″N,0°59′26″E"))
