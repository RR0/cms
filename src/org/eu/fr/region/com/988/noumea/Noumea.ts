import { Place } from "../../../../../../../place"
import { NouvelleCaledonieCityCode } from "../NouvelleCaledonieCityCode"
import { City } from "../../../../../../country"
import { nouvelleCaledonie } from "../NouvelleCaledonie"

export const noumea = City.create(NouvelleCaledonieCityCode.Noumea, nouvelleCaledonie,
  Place.fromDMS("22°16′33″S,166°27′29″E"))
