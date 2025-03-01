import { Place } from "@rr0/place"
import { DeuxSevresCityCode } from "../DeuxSevresCityCode.js"
import { deuxSevres } from "../DeuxSevres.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const magne = City.create(String(DeuxSevresCityCode.Magne), deuxSevres,
  Place.fromDMS("46°18′56″N,0°32′44″W"))
