import { Place } from "@rr0/place"
import { NordCityCode } from "../NordCityCode.js"
import { nord } from "../Nord"
import { City } from "../../../../../../country"

export const thiant = City.create(String(NordCityCode.Thiant), nord, Place.fromDMS("50°18′23″N,3°26′57″E"))
