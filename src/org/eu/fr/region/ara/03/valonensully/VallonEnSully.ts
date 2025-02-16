import { Place } from "@rr0/place"
import { AllierCityCode } from "../AllierCityCode.js"
import { allier } from "../Allier"
import { City } from "../../../../../../country"

export const vallonEnSully = City.create(String(AllierCityCode.VallonEnSully), allier,
  Place.fromDMS("46°32′13″N,2°36′32″E"))
