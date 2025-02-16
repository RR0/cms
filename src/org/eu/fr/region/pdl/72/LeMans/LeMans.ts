import { Place } from "@rr0/place"
import { SartheCityCode } from "../SartheCityCode.js"
import { sarthe } from "../Sarthe"
import { City } from "../../../../../../country"

export const leMans72 = City.create(String(SartheCityCode.LeMans), sarthe, Place.fromLocation(48.004167, 0.196944))
