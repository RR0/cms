import { DepartmentMessages, RegionMessages } from "../../../../country/index.js"
import { LesserPolandDepartementCode } from "./LesserPolandDepartementCode.js"
import { suchaMessages_en } from "./sucha/SuchaMessages_en.js"

const cataloniaDepartementsMessageList: { [key in LesserPolandDepartementCode]: DepartmentMessages<any> } = {
  [LesserPolandDepartementCode.Sucha]: suchaMessages_en
}
export const lesserPolandMessages_en = RegionMessages.create("Lesser Poland",
  cataloniaDepartementsMessageList)
