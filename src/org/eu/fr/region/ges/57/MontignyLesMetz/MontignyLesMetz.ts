import { Place } from "@rr0/place"
import { MoselleCityCode } from "../MoselleCityCode.js"
import { moselle } from "../Moselle.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const montignyLesMetz = City.create(String(MoselleCityCode.MontignyLesMetz), moselle,
  Place.fromDMS("49° 06′ 02″N,6°09′14″E"))
