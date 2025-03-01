import { Place } from "@rr0/place"
import { MayenneCityCode } from "../MayenneCityCode.js"
import { mayenne } from "../Mayenne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const chateauGontier = City.create(String(MayenneCityCode.ChateauGontier), mayenne,
  Place.fromDMS("47°14′20″N,1°20′52″O"))
