import { Place } from "place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/index.js"

export const illinois = new Region(UsaStates.il, usa,
  [Place.fromDMS("36°58'N,42°30'W"), Place.fromDMS("87°30'N,91°30'W")])
