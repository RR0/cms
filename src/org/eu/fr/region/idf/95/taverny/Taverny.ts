import { Place } from "@rr0/place"
import { ValDOiseCityCode } from "../ValDOiseCityCode.js"
import { valDOise } from "../ValDOise.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const taverny = City.create(String(ValDOiseCityCode.Taverny), valDOise, Place.fromDMS("49°02′00″N,2°13′00″E"))
