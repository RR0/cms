import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere"
import { City } from "../../../../../../country"

export const saintGeoireEnValdaine = City.create(String(IsereCityCode.SaintGeoireEnValdaine), isere,
  Place.fromDMS(`45°27′27″N,5°38′08″E`))
