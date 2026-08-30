import { GuadeloupeCityCode } from "./GuadeloupeCityCode.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

export type GuadeloupeCityMessage = { [key in GuadeloupeCityCode]: CityMessages }
