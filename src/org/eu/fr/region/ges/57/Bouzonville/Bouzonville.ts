import { Place } from "@rr0/place"
import { MoselleCityCode } from "../MoselleCityCode.js"
import { moselle } from "../Moselle.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const bouzonville = City.create(String(MoselleCityCode.Bouzonville), moselle,
  Place.fromDMS("49° 17′ 33″ N, 6° 32′ 06″E"))
