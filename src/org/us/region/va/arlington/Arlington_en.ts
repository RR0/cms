import { DepartmentMessages } from "../../../../country/index.js"
import { ArlingtonCityCode } from "./ArlingtonCityCode.js"
import { pentagon_en } from "./pentagon/Pentagon_en.js"

export const arlington_en = DepartmentMessages.create("Arlington County", {
  [ArlingtonCityCode.Pentagon]: pentagon_en
})
