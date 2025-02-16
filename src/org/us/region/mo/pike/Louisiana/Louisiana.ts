import { Place } from "@rr0/place"
import { pike } from "../Pike.js"
import { PikeCityCode } from "../PikeCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let louisiana = usaCity(PikeCityCode.Louisiana, pike, Place.fromDMS("39°26′29″N,91°03′46″W"))
