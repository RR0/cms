import { tarrantCities } from "./tarrant/TarrantCities"
import { City } from "../../../country"
import { houston } from "./houston/Houston"

export const texasCities: City[] = [
  houston,
  ...tarrantCities
]
