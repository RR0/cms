import { Place } from "@rr0/place"
import { DromeCityCode } from "../DromeCityCode.js"
import { drome } from "../Drome.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const chateaudouble = City.create(String(DromeCityCode.Chateaudouble), drome,
  Place.fromDMS("44°54′01″N,5°05′46″E"))
