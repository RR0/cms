import { City } from "../../../country"
import { bristol } from "./bristol/Bristol"
import { arlingtonCities } from "./arlington/ArlingtonCities"

export const virginiaCities: City[] = [
  bristol,
  ...arlingtonCities
]