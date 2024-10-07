import { FederalDistrictCityCode } from "../FederalDistrictCityCode"
import { federalDistrict } from "../FederalDistrict"
import { City } from "../../../../../country"
import { Place } from "../../../../../../place"

export let brasilia = new City(FederalDistrictCityCode.Brasilia, federalDistrict,
  [Place.fromDMS("15°47′38″S,47°52′58″W")])
