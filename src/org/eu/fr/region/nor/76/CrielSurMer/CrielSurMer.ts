import { Place } from "@rr0/place"
import { SeineMaritimeCityCode } from "../SeineMaritimeCityCode.js"
import { seineMaritime } from "../SeineMaritime.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const crielSurMer = City.create(String(SeineMaritimeCityCode.CrielSurMer), seineMaritime,
  Place.fromDMS("50° 01′ 00″ N, 1° 19′ 06″ E"))
