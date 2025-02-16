import { Place } from "@rr0/place"
import { MarneCityCode } from "../MarneCityCode.js"
import { marne } from "../Marne"
import { City } from "../../../../../../country"

export const reims = City.create(String(MarneCityCode.Reims), marne, Place.fromDMS("49°15′46″N,4°02′05″E"))
