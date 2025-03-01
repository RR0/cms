import { Place } from "@rr0/place"
import { MoselleCityCode } from "../MoselleCityCode.js"
import { moselle } from "../Moselle.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const forbach = City.create(String(MoselleCityCode.Forbach), moselle, Place.fromDMS("49° 11′ 20″N, 6° 54′ 03″E"))
