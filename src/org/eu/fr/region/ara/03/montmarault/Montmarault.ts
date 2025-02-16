import { Place } from "@rr0/place"
import { AllierCityCode } from "../AllierCityCode.js"
import { allier } from "../Allier"
import { City } from "../../../../../../country"

export const montmarault = City.create(String(AllierCityCode.Montmarault), allier,
  Place.fromDMS("46°19′06″N,2°57′20″E"))
