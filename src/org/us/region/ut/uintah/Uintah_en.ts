import { UintahCityCode } from "./UintahCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"
import { skinwalker_en } from "./skinwalker/Skinwalker_en.js"

export const uintah_en = DepartmentMessages.create("Uintah County", {
  [UintahCityCode.Skinwalker]: skinwalker_en
})
