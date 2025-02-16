import { Place } from "@rr0/place"
import { JuraCityCode } from "../JuraCityCode.js"
import { jura } from "../Jura"
import { City } from "../../../../../../country"

export const saintClaude = City.create(String(JuraCityCode.SaintClaude), jura, Place.fromDMS("47°23′55″N,4°32′33″E"))
