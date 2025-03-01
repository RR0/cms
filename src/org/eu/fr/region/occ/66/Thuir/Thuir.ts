import { Place } from "@rr0/place"
import { PyreneesOrientalesCityCode } from "../PyreneesOrientalesCityCode.js"
import { pyreneesOrientales } from "../PyreneesOrientales.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const thuir = City.create(String(PyreneesOrientalesCityCode.Thuir), pyreneesOrientales,
  Place.fromDMS("42°37′59″N,2°45′26″E"))
