import { createCity } from "../NwpCity.js"
import { Place } from "@rr0/place"
import { NwpCityCode } from "../NwpCityCode.js"

export let parkano = createCity(NwpCityCode.Parkano, Place.fromDMS("62°00′30″N,23°01′30″E"))
