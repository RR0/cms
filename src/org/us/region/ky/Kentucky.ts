import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const kentucky = new Region(UsaStates.ky, usa,
  [Place.fromDMS("36°30'N,81°58'W"), Place.fromDMS("39°09'N,89°34'W")])
