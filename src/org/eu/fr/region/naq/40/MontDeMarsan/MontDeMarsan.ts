import { Place } from "@rr0/place"
import { LandesCityCode } from "../LandesCityCode.js"
import { landes } from "../Landes"
import { City } from "../../../../../../country"

export const montDeMarsan = City.create(String(LandesCityCode.MontDeMarsan), landes,
  Place.fromDMS("43°53′29″N,0°29′58″O"))
