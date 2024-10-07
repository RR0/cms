import { CataloniaDepartementCode } from "./CataloniaDepartementCode.js"
import { DepartmentMessages, RegionMessages } from "../../../../country/index.js"
import { lleidaMessages_fr } from "./lleida/LleidaMessages_fr.js"

const cataloniaDepartementsMessageList: { [key in CataloniaDepartementCode]: DepartmentMessages<any> } = {
  [CataloniaDepartementCode.Lleida]: lleidaMessages_fr
}
export const cataloniaMessages_fr = RegionMessages.create("Catalogne",
  cataloniaDepartementsMessageList)
