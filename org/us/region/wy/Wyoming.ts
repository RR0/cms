import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country/region/Region"

export const wyoming = new Region(UsaStates.wy, usa,
  [Place.fromDMS("41°0'N,104°03′W"), Place.fromDMS("45°0'N,111°03′W")])
