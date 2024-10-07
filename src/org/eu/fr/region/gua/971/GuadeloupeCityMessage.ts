import { GuadeloupeCityCode } from "./GuadeloupeCityCode.js"
import { CityMessages } from "../../../../../country/index.js"

export type GuadeloupeCityMessage = { [key in GuadeloupeCityCode]: CityMessages }
