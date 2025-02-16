import { Place } from "@rr0/place"
import { DoubsCityCode } from "../DoubsCityCode.js"
import { doubs } from "../Doubs"
import { City } from "../../../../../../country"

export const amathayVesigneux = City.create(String(DoubsCityCode.AmathayVesigneux), doubs,
  Place.fromDMS("47° 01′ 28″N,6°12′03″E"))
