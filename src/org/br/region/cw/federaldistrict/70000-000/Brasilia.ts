import { FederalDistrictCityCode } from "../FederalDistrictCityCode.js"
import { federalDistrict } from "../FederalDistrict.js"
import { City } from "../../../../../country/index.js"
import { Place } from "@rr0/place"

export let brasilia = new City(FederalDistrictCityCode.Brasilia, federalDistrict,
  [Place.fromDMS("15°47′38″S,47°52′58″W")])
