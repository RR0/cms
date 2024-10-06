import { City } from "../../../country"
import { fayetteCities } from "./fayette/FayetteCities"
import { masonCities } from "./mason/MasonCities"

export const westVirginiaCities: City[] = [
  ...fayetteCities,
  ...masonCities
]
