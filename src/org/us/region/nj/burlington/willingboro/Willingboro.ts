import { Place } from "@rr0/place"
import { burlington } from "../Burlington.js"
import { BurlingtonCityCode } from "../BurlingtonCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let willingboro = usaCity(BurlingtonCityCode.Willingboro, burlington, Place.fromLocation(40.02795, -74.886984))
