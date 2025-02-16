import { Place } from "@rr0/place"
import { ArdecheCityCode } from "../ArdecheCityCode.js"
import { ardeche } from "../Ardeche"
import { City } from "../../../../../../country"

export const largentiere = City.create(String(ArdecheCityCode.Largentiere), ardeche,
  Place.fromDMS("44°32′37″N,4°17′39″E"))
