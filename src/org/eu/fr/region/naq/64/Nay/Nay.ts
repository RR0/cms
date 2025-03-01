import { Place } from "@rr0/place"
import { PyreneesAtlantiquesCityCode } from "../PyreneesAtlantiquesCityCode.js"
import { pyreneesAtlantiques } from "../PyreneesAtlantiques.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const nay = City.create(String(PyreneesAtlantiquesCityCode.Nay), pyreneesAtlantiques,
  Place.fromDMS("43°10′52″N,0°15′40″W"))
