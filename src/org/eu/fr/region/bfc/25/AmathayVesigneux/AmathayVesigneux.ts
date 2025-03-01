import { Place } from "@rr0/place"
import { DoubsCityCode } from "../DoubsCityCode.js"
import { doubs } from "../Doubs.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const amathayVesigneux = City.create(String(DoubsCityCode.AmathayVesigneux), doubs,
  Place.fromDMS("47° 01′ 28″N,6°12′03″E"))
