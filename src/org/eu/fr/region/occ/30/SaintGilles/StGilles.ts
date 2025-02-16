import { Place } from "@rr0/place"
import { GardCityCode } from "../GardCityCode.js"
import { gard } from "../Gard"
import { City } from "../../../../../../country"

export const stGilles = City.create(String(GardCityCode.SaintGilles), gard, Place.fromDMS("43°40′43″N,4°25′54″E"))
