import { Place } from "@rr0/place"
import { PyreneesOrientalesCityCode } from "../PyreneesOrientalesCityCode.js"
import { pyreneesOrientales } from "../PyreneesOrientales"
import { City } from "../../../../../../country"

export const portePuymorens = City.create(String(PyreneesOrientalesCityCode.PortePuymorens), pyreneesOrientales,
  Place.fromDMS("42°32′57″N,1°49′57″E"))
