import { Place } from "@rr0/place"
import { CoteDOrCityCode } from "../CoteDOrCityCode.js"
import { coteDOr } from "../CoteDOr.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const mirebeauSurBeze = City.create(String(CoteDOrCityCode.MirebeauSurBeze), coteDOr,
  Place.fromDMS("47°23′59″N,5°19′09″E"))
