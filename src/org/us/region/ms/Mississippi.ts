import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/index.js"

export const mississippi = new Region(UsaStates.ms, usa, [Place.fromDMS("33°0'N,90°0'W")])
