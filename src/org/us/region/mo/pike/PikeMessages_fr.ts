import { louisianaMessages } from "./Louisiana/LouisianaMessages.js"
import { PikeCityCode } from "./PikeCityCode.js"
import { DepartmentMessages } from "../../../../country/index.js"

export const pikeMessages_fr = DepartmentMessages.create("Comté de Pike", {
  [PikeCityCode.Louisiana]: louisianaMessages
})
