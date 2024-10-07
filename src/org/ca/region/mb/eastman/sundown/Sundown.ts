import { eastman } from "../Eastman.js"
import { EastmanCityCode } from "../EastmanCityCode.js"
import { City } from "../../../../../country/index.js"
import { Place } from "../../../../../../place/index.js"

export const sundown = City.create(EastmanCityCode.Sundown, eastman, Place.fromDMS("49°6′13″N,96°16′0″W"))
