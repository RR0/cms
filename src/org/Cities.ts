import { City } from "./country/index.js"
import { chinaCities } from "./cn/region/ChinaCities"
import { usaCities } from "./us/region/UsaCities"
import { australiaCities } from "./au"
import { brazilCities } from "./br/region/BrazilCities"
import { canadaCities } from "./ca/region/CanadaCities"
import { europeCities } from "./eu/EuropeCities"
import { indiaCities } from "./in/region/IndiaCities"
import { ukCities } from "./uk/region/UkCities"
import { mozambiqueCities } from "./mz/region/MozambiqueCities"
import { newZealandCities } from "./nz/region/NewZealandCities"
import { russiaCities } from "./ru/region/RussiaCities"

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
