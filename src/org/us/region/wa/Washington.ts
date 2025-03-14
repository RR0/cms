import { Place, PlaceLocation } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usaRegion } from "../../Usa.js"

export const washington = usaRegion(UsaStates.wa,
  new Place([PlaceLocation.fromDMS("45°33′ N,116°55′ W"), PlaceLocation.fromDMS("49°0' N,124°46′ W")]))
