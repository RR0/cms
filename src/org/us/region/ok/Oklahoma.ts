import { Place } from "place/Place"
import { UsaStates } from "../UsaStates"
import { usa } from "../../Usa"
import { Region } from "../../../country"

export const oklahoma = new Region(UsaStates.ok, usa, [Place.fromDMS("33°0'N,90°0'W")])