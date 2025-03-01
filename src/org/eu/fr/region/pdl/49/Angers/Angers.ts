import { Place } from "@rr0/place"
import { MaineEtLoireCityCode } from "../MaineEtLoireCityCode.js"
import { maineEtLoire } from "../MaineEtLoire.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const angers = City.create(String(MaineEtLoireCityCode.Angers), maineEtLoire,
  Place.fromDMS("47°28′25″N,0°33′15″O"))
