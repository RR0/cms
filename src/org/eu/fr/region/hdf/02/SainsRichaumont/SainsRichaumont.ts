import { Place } from "@rr0/place"
import { AisneCityCode } from "../AisneCityCode.js"
import { aisne } from "../Aisne"
import { City } from "../../../../../../country"

export const sainsRichaumont = City.create(String(AisneCityCode.SainsRichaumont), aisne,
  Place.fromDMS("49°49′29″N,3°42′36″E"))
