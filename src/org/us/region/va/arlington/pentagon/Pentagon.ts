import { arlington } from "../Arlington.js"
import { Place } from "@rr0/place"
import { City } from "../../../../../country/region/department/city/City.js"
import { ArlingtonCityCode } from "../ArlingtonCityCode.js"

export let pentagon = new City(ArlingtonCityCode.Pentagon, arlington, [Place.fromDMS("38°52′15″N,77°03′18″W")])
