import { Place } from "@rr0/place"
import { CherCityCode } from "../CherCityCode.js"
import { cher } from "../Cher.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const chateauneufSurCher = City.create(String(CherCityCode.ChateauneufSurCher), cher,
  Place.fromDMS("46°51′30″N,2°19′02″E"))
