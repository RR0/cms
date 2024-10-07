import { Place } from "../../../../../../../place/index.js"
import { PieksamakiCityCode } from "../PieksamakiCityCode.js"
import { City } from "../../../../../../country/index.js"
import { pieksamakiDep } from "../PieksamakiDep.js"

export let pieksamaki = new City(PieksamakiCityCode.Pieksamaki, pieksamakiDep, [Place.fromDMS("62°18′00″N,27°08′00″E")])
