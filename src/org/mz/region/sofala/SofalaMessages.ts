import { CityMessages } from "../../../country/region/department/city/CityMessages.js"

enum SofalaCityCode {
  beiraCityCode
}

export type SofalaDepartmentCityList = { [key in SofalaCityCode]: CityMessages }
