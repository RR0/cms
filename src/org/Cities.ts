import { City } from "./country/index.js"
import { chinaCities } from "./cn/region/ChinaCities.js"
import { usaCities } from "./us/region/UsaCities.js"
import { australiaCities } from "./au/index.js"
import { brazilCities } from "./br/region/BrazilCities.js"
import { canadaCities } from "./ca/region/CanadaCities.js"
import { europeCities } from "./eu/EuropeCities.js"
import { indiaCities } from "./in/region/IndiaCities.js"
import { ukCities } from "./uk/region/UkCities.js"
import { mozambiqueCities } from "./mz/region/MozambiqueCities.js"
import { newZealandCities } from "./nz/region/NewZealandCities.js"
import { russiaCities } from "./ru/region/RussiaCities.js"

export const cities: City[] = [
  ...chinaCities,
  ...australiaCities,
  ...brazilCities,
  ...canadaCities,
  ...europeCities,
  ...indiaCities,
  ...ukCities,
  ...mozambiqueCities,
  ...newZealandCities,
  ...russiaCities,
  ...usaCities
]
