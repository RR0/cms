import { Place } from "@rr0/place"
import { SartheCityCode } from "../SartheCityCode.js"
import { sarthe } from "../Sarthe.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const sougeLeGanelon = City.create(String(SartheCityCode.SougeLeGanelon), sarthe,
  Place.fromDMS("8°19′05″N,0°01′50″W"))
