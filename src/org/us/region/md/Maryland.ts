import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const maryland = new Region(UsaStates.md, usa,
  [Place.fromDMS("37°53'N,75°03'W"), Place.fromDMS("39°43'N,79°29'W")])
