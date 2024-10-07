import { CataloniaDepartementCode } from "./CataloniaDepartementCode.js"
import { DepartmentMessages, RegionMessages } from "../../../../country/index.js"
import { lleidaMessages_en } from "./lleida/LleidaMessages_en.js"

const cataloniaDepartementsMessageList: { [key in CataloniaDepartementCode]: DepartmentMessages<any> } = {
  [CataloniaDepartementCode.Lleida]: lleidaMessages_en
}
export const cataloniaMessages_en = RegionMessages.create("Catalonia",
  cataloniaDepartementsMessageList)
