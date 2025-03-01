import { Place } from "@rr0/place"
import { NordCityCode } from "../NordCityCode.js"
import { nord } from "../Nord.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const avesnesLesAubert = City.create(String(NordCityCode.AvesnesLesAubert), nord,
  Place.fromDMS("50°11′52″N,3°22′51″E"))
