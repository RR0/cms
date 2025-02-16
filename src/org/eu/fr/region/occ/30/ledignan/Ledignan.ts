import { Place } from "@rr0/place"
import { GardCityCode } from "../GardCityCode.js"
import { gard } from "../Gard"
import { City } from "../../../../../../country"

export const ledignan = City.create(String(GardCityCode.Ledignan), gard, Place.fromDMS("43°59′22″N,4°06′26″E"))
