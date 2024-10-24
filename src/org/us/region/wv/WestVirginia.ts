import { Place } from "../../../../place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usaRegion } from "../../Usa.js"
import { PlaceLocation } from "@rr0/place"

export const westVirginia = usaRegion(UsaStates.wv, new Place([PlaceLocation.fromDMS("38°51′27″N,82°7′43″W")]))
