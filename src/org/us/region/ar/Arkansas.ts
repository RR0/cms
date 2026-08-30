import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const arkansas = new Region(UsaStates.ak, usa,
  [Place.fromDMS("33°0'N,89°41'W"), Place.fromDMS("36°30'N,94°42'W")])
