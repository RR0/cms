import { Place } from "@rr0/place"
import { BouchesDuRhoneCityCode } from "../BouchesDuRhoneCityCode.js"
import { bouchesDuRhone } from "../BouchesDuRhone"
import { City } from "../../../../../../country"

export const eyragues = City.create(String(BouchesDuRhoneCityCode.Eyragues), bouchesDuRhone,
  Place.fromDMS("43°50′31″N,4°50′30″E"))
