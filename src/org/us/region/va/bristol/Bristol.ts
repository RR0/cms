import { City } from "../../../../country/region/department/city/City.js"
import { virginia } from "../Virginia.js"
import { Place } from "@rr0/place"

export const bristolCityCode = "bristolVA"
export let bristol = new City(bristolCityCode, virginia, [Place.fromDMS("36°36′N,82°11′W")])
