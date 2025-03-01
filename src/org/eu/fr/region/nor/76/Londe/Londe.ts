import { Place } from "@rr0/place"
import { SeineMaritimeCityCode } from "../SeineMaritimeCityCode.js"
import { seineMaritime } from "../SeineMaritime.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const londe76 = City.create(String(SeineMaritimeCityCode.Londe), seineMaritime,
  Place.fromDMS("49°18′24″N,0°57′14″E"))
