import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const saintMarcellin = City.create(String(IsereCityCode.SaintMarcellin), isere,
  Place.fromDMS("45°09′14″N,5°19′14″E"))
