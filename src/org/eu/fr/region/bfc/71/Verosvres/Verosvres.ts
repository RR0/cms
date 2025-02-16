import { Place } from "@rr0/place"
import { SaoneEtLoireCityCode } from "../SaoneEtLoireCityCode.js"
import { saoneEtLoire } from "../SaoneEtLoire"
import { City } from "../../../../../../country"

export const verosvres = City.create(String(SaoneEtLoireCityCode.Verosvres), saoneEtLoire,
  Place.fromDMS("46°24′05″N,4°26′38″E"))
