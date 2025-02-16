import { Place } from "@rr0/place"
import { clark } from "../Clark.js"
import { ClarkCityCode } from "../ClarkCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let lasVegas = usaCity(ClarkCityCode.LasVegas, clark, Place.fromDMS("36°10′2″N,115°8′55″W"))
