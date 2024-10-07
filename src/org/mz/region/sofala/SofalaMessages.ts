import { CityMessages } from "../../../country/index.js"

enum SofalaCityCode {
  beiraCityCode
}

export type SofalaDepartmentCityList = { [key in SofalaCityCode]: CityMessages }
