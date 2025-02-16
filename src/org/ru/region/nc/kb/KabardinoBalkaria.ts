import { RussiaDepartementCode } from "../../RussiaDepartementCode.js"
import { northCaucasus } from "../NorthCaucasus.js"
import { Place } from "@rr0/place"
import { russiaDepartment } from "../../RussiaDepartment.js"

export const kabardinoBalkaria = russiaDepartment(RussiaDepartementCode.KabardinoBalkaria, northCaucasus,
  Place.fromDMS("47°20′N,1°40′O"))
