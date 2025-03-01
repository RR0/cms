import { Place } from "@rr0/place"
import { LandesCityCode } from "../LandesCityCode.js"
import { landes } from "../Landes.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const montDeMarsan = City.create(String(LandesCityCode.MontDeMarsan), landes,
  Place.fromDMS("43°53′29″N,0°29′58″O"))
