import { City } from "../../../country/index.js"
import { fayetteCities } from "./fayette/FayetteCities.js"
import { masonCities } from "./mason/MasonCities.js"

export const westVirginiaCities: City[] = [
  ...fayetteCities,
  ...masonCities
]
