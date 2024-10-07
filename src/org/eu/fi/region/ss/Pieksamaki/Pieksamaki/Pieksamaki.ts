import { Place } from "../../../../../../../place"
import { PieksamakiCityCode } from "../PieksamakiCityCode"
import { City } from "../../../../../../country"
import { pieksamakiDep } from "../PieksamakiDep"

export let pieksamaki = new City(PieksamakiCityCode.Pieksamaki, pieksamakiDep, [Place.fromDMS("62°18′00″N,27°08′00″E")])
