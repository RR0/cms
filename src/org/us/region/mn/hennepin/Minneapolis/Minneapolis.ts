import { Place } from "@rr0/place"
import { hennepin } from "../Hennepin.js"
import { HennepinCityCode } from "../HennepinCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let minneapolis = usaCity(HennepinCityCode.Minneapolis, hennepin, Place.fromDMS("44°58′55″N,93°16′09″W"))
