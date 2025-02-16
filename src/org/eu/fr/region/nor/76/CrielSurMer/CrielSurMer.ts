import { Place } from "@rr0/place"
import { SeineMaritimeCityCode } from "../SeineMaritimeCityCode.js"
import { seineMaritime } from "../SeineMaritime"
import { City } from "../../../../../../country"

export const crielSurMer = City.create(String(SeineMaritimeCityCode.CrielSurMer), seineMaritime,
  Place.fromDMS("50° 01′ 00″ N, 1° 19′ 06″ E"))
