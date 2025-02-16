import { Place } from "@rr0/place"
import { GuadeloupeCityCode } from "../GuadeloupeCityCode.js"
import { City } from "../../../../../../country/index.js"
import { guadeloupe } from "../Guadeloupe.js"

export const leMoule = City.create(GuadeloupeCityCode.LeMoule, guadeloupe,
  Place.fromDMS("16°20′00″N,61°21′00″O"))
