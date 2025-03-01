import { Place } from "@rr0/place"
import { MorbihanCityCode } from "../MorbihanCityCode.js"
import { morbihan } from "../Morbihan.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const locmine = City.create(String(MorbihanCityCode.Locmine), morbihan,
  Place.fromDMS(`47° 53′ 15″N, 2° 50′ 04″W`))
