import { Place } from "@rr0/place"
import { PasDeCalaisCityCode } from "../PasDeCalaisCityCode.js"
import { pasDeCalais } from "../PasDeCalais"
import { City } from "../../../../../../country"

export const calais = City.create(String(PasDeCalaisCityCode.Calais), pasDeCalais,
  Place.fromDMS("50°56′53″N,1°51′23″E"))
