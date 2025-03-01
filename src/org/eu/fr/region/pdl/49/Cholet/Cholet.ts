import { Place } from "@rr0/place"
import { MaineEtLoireCityCode } from "../MaineEtLoireCityCode.js"
import { maineEtLoire } from "../MaineEtLoire.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const cholet = City.create(String(MaineEtLoireCityCode.Cholet), maineEtLoire,
  Place.fromDMS("47° 03′ 36″N, 0° 52′ 42″W"))
