import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere"
import { City } from "../../../../../../country"

export const venon = City.create(String(IsereCityCode.Venon), isere, Place.fromDMS("45° 10′ 22″N, 5° 48′ 19″E"))
