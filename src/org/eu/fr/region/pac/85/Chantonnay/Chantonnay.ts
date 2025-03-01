import { Place } from "@rr0/place"
import { VendeeCityCode } from "../VendeeCityCode.js"
import { vendee } from "../Vendee.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const chantonnay = City.create(String(VendeeCityCode.Chantonnay), vendee, Place.fromDMS("46°41′16″N,1°02′58″W"))
