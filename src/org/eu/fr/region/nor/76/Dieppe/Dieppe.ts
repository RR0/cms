import { Place } from "@rr0/place"
import { SeineMaritimeCityCode } from "../SeineMaritimeCityCode.js"
import { seineMaritime } from "../SeineMaritime.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const dieppe = City.create(String(SeineMaritimeCityCode.Dieppe), seineMaritime,
  Place.fromDMS("49° 55′ 20″N, 1° 04′ 43″E"))
