import { Place } from "@rr0/place"
import { cascade } from "../Cascade.js"
import { CascadeCityCode } from "../CascadeCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let greatFalls = usaCity(CascadeCityCode.GreatFalls, cascade, Place.fromDMS("47°29′30″N,111°17′21″W"))
