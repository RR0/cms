import { Place } from "@rr0/place"
import { LoiretCityCode } from "../LoiretCityCode.js"
import { City } from "../../../../../../country"
import { loiret } from "../Loiret"

export const bou45 = City.create(String(LoiretCityCode.Bou), loiret, Place.fromDMS("47°52′27″N,2°02′54″E"))
