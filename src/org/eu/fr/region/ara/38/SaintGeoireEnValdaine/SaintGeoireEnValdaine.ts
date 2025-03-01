import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const saintGeoireEnValdaine = City.create(String(IsereCityCode.SaintGeoireEnValdaine), isere,
  Place.fromDMS(`45°27′27″N,5°38′08″E`))
