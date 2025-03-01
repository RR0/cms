import { Place } from "@rr0/place"
import { AllierCityCode } from "../AllierCityCode.js"
import { allier } from "../Allier.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const vallonEnSully = City.create(String(AllierCityCode.VallonEnSully), allier,
  Place.fromDMS("46°32′13″N,2°36′32″E"))
