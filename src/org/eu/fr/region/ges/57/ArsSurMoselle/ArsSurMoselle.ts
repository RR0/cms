import { Place } from "@rr0/place"
import { MoselleCityCode } from "../MoselleCityCode.js"
import { moselle } from "../Moselle.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const arsSurMoselle = City.create(String(MoselleCityCode.ArsSurMoselle), moselle,
  Place.fromDMS("49°04′44″N,6°04′30″E"))
