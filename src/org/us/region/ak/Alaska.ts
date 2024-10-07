import { Place } from "../../../../place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usa } from "../../Usa.js"
import { Region } from "../../../country/index.js"

export const alaska = new Region(UsaStates.ak, usa, [Place.fromDMS("64°0'N 152°0'W")])
