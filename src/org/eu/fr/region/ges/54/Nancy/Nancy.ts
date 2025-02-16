import { Place } from "@rr0/place"
import { MeurtheEtMoselleCityCode } from "../MeurtheEtMoselleCityCode.js"
import { meurtheEtMoselle } from "../MeurtheEtMoselle"
import { City } from "../../../../../../country"

export const nancy = City.create(String(MeurtheEtMoselleCityCode.Nancy), meurtheEtMoselle,
  Place.fromDMS("48°41′37″N,6°11′05″E"))
