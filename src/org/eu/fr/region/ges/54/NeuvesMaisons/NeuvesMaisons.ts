import { Place } from "@rr0/place"
import { MeurtheEtMoselleCityCode } from "../MeurtheEtMoselleCityCode.js"
import { meurtheEtMoselle } from "../MeurtheEtMoselle.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const neuvesMaisons = City.create(String(MeurtheEtMoselleCityCode.NeuvesMaisons), meurtheEtMoselle,
  Place.fromDMS("48°37′01″N,6°06′16″E"))
