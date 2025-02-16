import { Place } from "@rr0/place"
import { MaineEtLoireCityCode } from "../MaineEtLoireCityCode.js"
import { maineEtLoire } from "../MaineEtLoire"
import { City } from "../../../../../../country"

export const angers = City.create(String(MaineEtLoireCityCode.Angers), maineEtLoire,
  Place.fromDMS("47°28′25″N,0°33′15″O"))
