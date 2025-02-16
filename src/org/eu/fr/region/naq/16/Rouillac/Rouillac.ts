import { Place } from "@rr0/place"
import { CharenteCityCode } from "../CharenteCityCode.js"
import { charente } from "../Charente"
import { City } from "../../../../../../country"

export const rouillac16 = City.create(String(CharenteCityCode.Rouillac), charente,
  Place.fromDMS("45° 46′ 36″N, 0° 03′ 43″W"))
