import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const colorado = new Region(UsaStates.co, usa,
  [Place.fromDMS("37°0'N,102°0'W"), Place.fromDMS("41°0'N,109°0'W")])
