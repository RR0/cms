import { Place } from "@rr0/place"
import { LoiretCityCode } from "../LoiretCityCode.js"
import { loiret } from "../Loiret.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const chateauRenard = City.create(String(LoiretCityCode.ChateauRenard), loiret,
  Place.fromDMS("47°55′53″N,2°55′41″E"))
