import { Place } from "@rr0/place"
import { GardCityCode } from "../GardCityCode.js"
import { gard } from "../Gard.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const ledignan = City.create(String(GardCityCode.Ledignan), gard, Place.fromDMS("43°59′22″N,4°06′26″E"))
