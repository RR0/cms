import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/index.js"

export const missouri = new Region(UsaStates.mo, usa,
  [Place.fromDMS("36°0'N,89°6'W"), Place.fromDMS("40°37'N,95°46'W")])
