import { Place } from "@rr0/place"
import { HeraultCityCode } from "../HeraultCityCode.js"
import { herault } from "../Herault"
import { City } from "../../../../../../country"

export const saintGeniesDesMourgues = City.create(String(HeraultCityCode.SaintGeniesDesMourgues), herault,
  Place.fromDMS("43°41′52″N,4°02′10″E"))
