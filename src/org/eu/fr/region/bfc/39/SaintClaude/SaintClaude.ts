import { Place } from "@rr0/place"
import { JuraCityCode } from "../JuraCityCode.js"
import { jura } from "../Jura.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const saintClaude = City.create(String(JuraCityCode.SaintClaude), jura, Place.fromDMS("47°23′55″N,4°32′33″E"))
