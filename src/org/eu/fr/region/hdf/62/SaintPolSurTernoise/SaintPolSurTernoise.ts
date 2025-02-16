import { Place } from "@rr0/place"
import { PasDeCalaisCityCode } from "../PasDeCalaisCityCode.js"
import { pasDeCalais } from "../PasDeCalais"
import { City } from "../../../../../../country"

export const saintPolSurTernoise = City.create(String(PasDeCalaisCityCode.SaintPolSurTernoise), pasDeCalais,
  Place.fromDMS("50°22′47″N,2°20′08″E"))
