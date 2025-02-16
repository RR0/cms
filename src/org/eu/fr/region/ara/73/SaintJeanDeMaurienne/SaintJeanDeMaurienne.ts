import { Place } from "@rr0/place"
import { SavoieCityCode } from "../SavoieCityCode.js"
import { savoie } from "../Savoie"
import { City } from "../../../../../../country"

export const saintJeanDeMaurienne = City.create(String(SavoieCityCode.SaintJeanDeMaurienne), savoie,
  Place.fromDMS("45°16′22″N,6°20′54″E"))
