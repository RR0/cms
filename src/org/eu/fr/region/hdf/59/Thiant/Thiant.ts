import { Place } from "@rr0/place"
import { NordCityCode } from "../NordCityCode.js"
import { nord } from "../Nord.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const thiant = City.create(String(NordCityCode.Thiant), nord, Place.fromDMS("50°18′23″N,3°26′57″E"))
