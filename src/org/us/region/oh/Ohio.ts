import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/region/Region.js"

export const ohio = new Region(UsaStates.oh, usa, [Place.fromDMS("38°24'N,80°31'W"), Place.fromDMS("41°59'N,84°49'W")])
