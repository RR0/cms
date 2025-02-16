import { Place } from "@rr0/place"
import { SeineEtMarneCityCode } from "../SeineEtMarneCityCode.js"
import { seineEtMarne } from "../SeineEtMarne"
import { City } from "../../../../../../country"

export const sivryCourtry = City.create(String(SeineEtMarneCityCode.SivryCourtry), seineEtMarne,
  Place.fromDMS("48°31′43″N,2°45′21″E"))
