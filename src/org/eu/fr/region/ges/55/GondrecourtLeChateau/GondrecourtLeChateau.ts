import { Place } from "@rr0/place"
import { MeuseCityCode } from "../MeuseCityCode.js"
import { meuse } from "../Meuse.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const gondrecourtLeChateau = City.create(String(MeuseCityCode.GondrecourtLeChateau), meuse,
  Place.fromDMS("48°30′51″N,5°30′28″E"))
