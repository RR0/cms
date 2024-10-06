import { DepartmentMessages, RegionMessages } from "../../../../country"
import { LesserPolandDepartementCode } from "./LesserPolandDepartementCode"
import { suchaMessages_fr } from "./sucha/SuchaMessages_fr"

const cataloniaDepartementsMessageList: { [key in LesserPolandDepartementCode]: DepartmentMessages<any> } = {
  [LesserPolandDepartementCode.Sucha]: suchaMessages_fr
}
export const lesserPolandMessages_fr = RegionMessages.create("Voïvodie de Petite-Pologne",
  cataloniaDepartementsMessageList)
