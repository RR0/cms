import { City } from "../../../country/index.js"
import { bristol } from "./bristol/Bristol.js"
import { arlingtonCities } from "./arlington/ArlingtonCities.js"

export const virginiaCities: City[] = [
  bristol,
  ...arlingtonCities
]
