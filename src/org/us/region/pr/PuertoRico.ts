import { Place } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/index.js"

export const puertoRico = new Region(UsaStates.pr, usa, [Place.fromDMS("18°15′N,66°30′O")])
