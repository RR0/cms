import { Place } from "@rr0/place"
import { SavoieCityCode } from "../SavoieCityCode.js"
import { savoie } from "../Savoie.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const saintJeanDeMaurienne = City.create(String(SavoieCityCode.SaintJeanDeMaurienne), savoie,
  Place.fromDMS("45°16′22″N,6°20′54″E"))
