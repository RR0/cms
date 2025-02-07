import { Place } from "../../../../../../place/Place.js"
import { hinds } from "../Hinds.js"
import { HindsCityCode } from "../HindsCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let jackson = usaCity(HindsCityCode.Jackson, hinds, Place.fromDMS("32°17′56″N,90°11′05″W"))
