import { Place } from "@rr0/place"
import { MarneCityCode } from "../MarneCityCode.js"
import { marne } from "../Marne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const reims = City.create(String(MarneCityCode.Reims), marne, Place.fromDMS("49°15′46″N,4°02′05″E"))
