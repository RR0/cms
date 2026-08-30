import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const connecticut = new Region(UsaStates.ct, usa,
  [Place.fromDMS("40°58'N,71°47'W"), Place.fromDMS("42°03'N,73°44'W")])
