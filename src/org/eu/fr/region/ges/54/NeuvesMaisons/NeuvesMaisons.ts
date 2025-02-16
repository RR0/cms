import { Place } from "@rr0/place"
import { MeurtheEtMoselleCityCode } from "../MeurtheEtMoselleCityCode.js"
import { meurtheEtMoselle } from "../MeurtheEtMoselle"
import { City } from "../../../../../../country"

export const neuvesMaisons = City.create(String(MeurtheEtMoselleCityCode.NeuvesMaisons), meurtheEtMoselle,
  Place.fromDMS("48°37′01″N,6°06′16″E"))
