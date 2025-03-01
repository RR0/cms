import { Place } from "@rr0/place"
import { VarCityCode } from "../VarCityCode.js"
import { Var } from "../Var.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const grimaud = City.create(String(VarCityCode.Grimaud), Var, Place.fromDMS("43°16′27″N,6°31′20″E"))
