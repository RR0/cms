import { Place } from "@rr0/place"
import { CherCityCode } from "../CherCityCode.js"
import { cher } from "../Cher"
import { City } from "../../../../../../country"

export const chateauneufSurCher = City.create(String(CherCityCode.ChateauneufSurCher), cher,
  Place.fromDMS("46°51′30″N,2°19′02″E"))
