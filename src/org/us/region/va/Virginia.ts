import { Place } from "../../../../place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usaRegion } from "../../Usa.js"
import { PlaceLocation } from "@rr0/place"

export const virginia = usaRegion(UsaStates.va, new Place([PlaceLocation.fromDMS("38°0'N, 79°0'W")]))
