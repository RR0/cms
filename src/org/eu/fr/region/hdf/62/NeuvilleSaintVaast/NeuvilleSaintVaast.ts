import { Place } from "@rr0/place"
import { PasDeCalaisCityCode } from "../PasDeCalaisCityCode.js"
import { pasDeCalais } from "../PasDeCalais.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const neuvilleSaintVaast = City.create(String(PasDeCalaisCityCode.NeuvilleSaintVaast), pasDeCalais,
  Place.fromDMS("50°21′22″N,2°45′32″E"))
