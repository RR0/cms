import { Place } from "../../../../place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usaRegion } from "../../Usa.js"
import { PlaceLocation } from "@rr0/place"

export const florida = usaRegion(UsaStates.fl,
  new Place([PlaceLocation.fromDMS("24°27'N,80° 02' W"), PlaceLocation.fromDMS("31° 00' N,87° 38' W")]))
