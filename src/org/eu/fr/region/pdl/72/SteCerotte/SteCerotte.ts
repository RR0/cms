import { Place } from "@rr0/place"
import { SartheCityCode } from "../SartheCityCode.js"
import { sarthe } from "../Sarthe.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const steCerotte = City.create(String(SartheCityCode.SteCerotte), sarthe, Place.fromDMS("47°54′02″N,0°41′15″E"))
