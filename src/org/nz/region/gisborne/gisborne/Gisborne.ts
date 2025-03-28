import { GisborneCityCode } from "../GisborneCityCode.js"
import { Place } from "@rr0/place"
import { gisborneRegion } from "../Gisborne.js"
import { City } from "../../../../country/region/department/city/City.js"

export let gisborneCity = new City(GisborneCityCode.Gisborne, gisborneRegion, [Place.fromLocation(44.896389, 6.635556)])
