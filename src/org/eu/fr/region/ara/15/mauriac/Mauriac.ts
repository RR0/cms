import { Place } from "@rr0/place"
import { CantalCityCode } from "../CantalCityCode.js"
import { cantal } from "../Cantal.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const mauriac = City.create(String(CantalCityCode.Mauriac), cantal, Place.fromDMS("45°13′11″N,2°20′03″E"))
