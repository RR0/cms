import { Place, PlaceLocation } from "@rr0/place"
import { UsaStates } from "../UsaStates.js"
import { usaRegion } from "../../Usa.js"

export const hawaii = usaRegion(UsaStates.hi, new Place([PlaceLocation.fromDMS("21°28′00″N,157°58′00″W")]))
