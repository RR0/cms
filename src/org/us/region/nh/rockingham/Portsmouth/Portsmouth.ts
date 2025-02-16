import { Place } from "@rr0/place"
import { rockingham } from "../Rockingham.js"
import { RockinghamCityCode } from "../RockinghamCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let portsmouth = usaCity(RockinghamCityCode.Portsmouth, rockingham, Place.fromDMS("43°4′32″N,70°45′38″W"))
