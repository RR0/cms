import { eastman } from "../Eastman"
import { EastmanCityCode } from "../EastmanCityCode"
import { City } from "../../../../../country"
import { Place } from "../../../../../../place"

export const sundown = City.create(EastmanCityCode.Sundown, eastman, Place.fromDMS("49°6′13″N,96°16′0″W"))
