import { Place } from "@rr0/place"
import { CantalCityCode } from "../CantalCityCode.js"
import { cantal } from "../Cantal"
import { City } from "../../../../../../country"

export const mauriac = City.create(String(CantalCityCode.Mauriac), cantal, Place.fromDMS("45°13′11″N,2°20′03″E"))
