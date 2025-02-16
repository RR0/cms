import { Place } from "@rr0/place"
import { SartheCityCode } from "../SartheCityCode.js"
import { sarthe } from "../Sarthe"
import { City } from "../../../../../../country"

export const bazoge = City.create(String(SartheCityCode.Bazoge), sarthe, Place.fromDMS("48°05′55″N,0°09′19″E"))
