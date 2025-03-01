import { Place } from "@rr0/place"
import { SartheCityCode } from "../SartheCityCode.js"
import { sarthe } from "../Sarthe.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const bazoge = City.create(String(SartheCityCode.Bazoge), sarthe, Place.fromDMS("48°05′55″N,0°09′19″E"))
