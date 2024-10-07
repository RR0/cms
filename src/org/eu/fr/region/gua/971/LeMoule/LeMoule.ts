import { Place } from "../../../../../../../place"
import { GuadeloupeCityCode } from "../GuadeloupeCityCode"
import { City } from "../../../../../../country"
import { guadeloupe } from "../Guadeloupe"

export const leMoule = City.create(GuadeloupeCityCode.LeMoule, guadeloupe,
  Place.fromDMS("16°20′00″N,61°21′00″O"))
