import { DepartmentMessages, RegionMessages } from "../../../../country/index.js"
import { LesserPolandDepartementCode } from "./LesserPolandDepartementCode.js"
import { suchaMessages_fr } from "./sucha/SuchaMessages_fr.js"

const cataloniaDepartementsMessageList: { [key in LesserPolandDepartementCode]: DepartmentMessages<any> } = {
  [LesserPolandDepartementCode.Sucha]: suchaMessages_fr
}
export const lesserPolandMessages_fr = RegionMessages.create("Voïvodie de Petite-Pologne",
  cataloniaDepartementsMessageList)
