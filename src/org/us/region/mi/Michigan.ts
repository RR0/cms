import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const michigan = new Region(UsaStates.mi, usa,
  [Place.fromDMS("41°41'N,82°7'W"), Place.fromDMS("48°18'N,90°25'W")])
