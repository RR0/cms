import { Place } from "@rr0/place"
import { SartheCityCode } from "../SartheCityCode.js"
import { sarthe } from "../Sarthe"
import { City } from "../../../../../../country"

export const sougeLeGanelon = City.create(String(SartheCityCode.SougeLeGanelon), sarthe,
  Place.fromDMS("8°19′05″N,0°01′50″W"))
