import { ArlingtonCityCode } from "./ArlingtonCityCode"
import { DepartmentMessages } from "../../../../country"
import { pentagon_fr } from "./pentagon/Pentagon_fr"

export const arlington_fr = DepartmentMessages.create("Comté d'Arlington", {
  [ArlingtonCityCode.Pentagon]: pentagon_fr
})