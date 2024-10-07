import { monroeCities } from "./monroe/MonroeCities.js"
import { City } from "../../../country/index.js"
import { elkhartCities } from "./elkhart/ElkhartCities.js"
import { whitleyCities } from "./whitley/WhitleyCities.js"

export const indianaCities: City[] = [
  ...elkhartCities,
  ...monroeCities,
  ...whitleyCities
]
