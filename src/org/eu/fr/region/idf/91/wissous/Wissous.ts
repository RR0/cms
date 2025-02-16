import { Place } from "@rr0/place"
import { EssonneCityCode } from "../EssonneCityCode.js"
import { essonne } from "../Essonne"
import { City } from "../../../../../../country"

export const wissous91 = City.create(String(EssonneCityCode.Wissous), essonne, Place.fromDMS("48°43′55″N,2°19′37″E"))
