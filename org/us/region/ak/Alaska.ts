import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country"

export const alaska = new Region(UsaStates.ak, usa, [Place.fromDMS("64°N 152°W")])
