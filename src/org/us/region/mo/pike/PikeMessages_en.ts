import { louisianaMessages } from "./Louisiana/LouisianaMessages.js"
import { PikeCityCode } from "./PikeCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const pikeMessages_en = DepartmentMessages.create("Pike County", {
  [PikeCityCode.Louisiana]: louisianaMessages
})
