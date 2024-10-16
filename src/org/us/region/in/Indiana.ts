import { Place } from "../../../../place/Place.js"
import { UsaStates } from "../UsaStates.js"
import { usaRegion } from "../../Usa.js"
import { PlaceLocation } from "../../../../place/PlaceLocation.js"

export const indiana = usaRegion(UsaStates.in, new Place([PlaceLocation.fromDMS("39°09′44″N,86°31′45″O")]))
