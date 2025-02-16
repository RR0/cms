import { Place } from "@rr0/place"
import { CalvadosCityCode } from "../CalvadosCityCode.js"
import { calvados } from "../Calvados"
import { City } from "../../../../../../country"

export const saintAubinSurMer14 = City.create(String(CalvadosCityCode.SaintAubinSurMer), calvados,
  Place.fromDMS("49° 19′" +
    " 45″N,0°23′19″W"))
