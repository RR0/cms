import { Place } from "@rr0/place"
import { PyreneesAtlantiquesCityCode } from "../PyreneesAtlantiquesCityCode.js"
import { pyreneesAtlantiques } from "../PyreneesAtlantiques"
import { City } from "../../../../../../country"

export const nay = City.create(String(PyreneesAtlantiquesCityCode.Nay), pyreneesAtlantiques,
  Place.fromDMS("43°10′52″N,0°15′40″W"))
