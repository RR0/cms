import { CityMessages } from "../../../country"

enum SofalaCityCode {
  beiraCityCode
}

export type SofalaDepartmentCityList = { [key in SofalaCityCode]: CityMessages }
