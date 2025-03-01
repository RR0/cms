import { Place } from "@rr0/place"
import { SeineMaritimeCityCode } from "../SeineMaritimeCityCode.js"
import { seineMaritime } from "../SeineMaritime.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const saintAubinSurMer76 = City.create(String(SeineMaritimeCityCode.SaintAubinSurMer), seineMaritime,
  Place.fromDMS("49°19′45″N,0°23′19″W"))
