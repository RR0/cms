import { Place } from "@rr0/place"
import { SartheCityCode } from "../SartheCityCode.js"
import { sarthe } from "../Sarthe"
import { City } from "../../../../../../country"

export const steCerotte = City.create(String(SartheCityCode.SteCerotte), sarthe, Place.fromDMS("47°54′02″N,0°41′15″E"))
