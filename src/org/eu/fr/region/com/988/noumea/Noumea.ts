import { Place } from "@rr0/place"
import { NouvelleCaledonieCityCode } from "../NouvelleCaledonieCityCode.js"
import { City } from "../../../../../../country/index.js"
import { nouvelleCaledonie } from "../NouvelleCaledonie.js"

export const noumea = City.create(NouvelleCaledonieCityCode.Noumea, nouvelleCaledonie,
  Place.fromDMS("22°16′33″S,166°27′29″E"))
