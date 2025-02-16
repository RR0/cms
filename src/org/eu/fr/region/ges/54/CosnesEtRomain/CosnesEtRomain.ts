import { Place } from "@rr0/place"
import { MeurtheEtMoselleCityCode } from "../MeurtheEtMoselleCityCode.js"
import { meurtheEtMoselle } from "../MeurtheEtMoselle"
import { City } from "../../../../../../country"

export const cosnesEtRomain = City.create(String(MeurtheEtMoselleCityCode.CosnesEtRomain), meurtheEtMoselle,
  Place.fromDMS("49°31′12″N,5°42′43″E"))
