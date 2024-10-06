import { City, CityService, departmentService } from "./country"
import { canadaCities } from "./ca/region/CanadaCities"
import { usaCities } from "./us/region/UsaCities"
import { brazilCities } from "./br/region/BrazilCities"
import { australiaCities } from "./au"
import { newZealandCities } from "./nz/region/NewZealandCities"
import { europeCities } from "./eu/EuropeCities"
import { ukCities } from "./uk/region/UkCities"
import { russiaCities } from "./ru/region/RussiaCities"
import { mozambiqueCities } from "./mz/region/MozambiqueCities"
import { indiaCities } from "./in/region/IndiaCities"

const cities: City[] = [
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

export const cityService = new CityService(cities, "org", departmentService)
