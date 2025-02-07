import { City, CityService, departmentService } from "./country/index.js"
import { chinaCities } from "./cn/region/ChinaCities"

const cities: City[] = [
  ...chinaCities
  /*  ...australiaCities,
    ...brazilCities,
    ...canadaCities,
    ...europeCities,
    ...indiaCities,
    ...ukCities,
    ...mozambiqueCities,
    ...newZealandCities,
    ...russiaCities,
    ...usaCities*/
]

export const cityService = new CityService(cities, "org", departmentService)
