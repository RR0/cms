import { CataloniaDepartementCode } from "./CataloniaDepartementCode"
import { DepartmentMessages, RegionMessages } from "../../../../country"
import { lleidaMessages_en } from "./lleida/LleidaMessages_en"

const cataloniaDepartementsMessageList: { [key in CataloniaDepartementCode]: DepartmentMessages<any> } = {
  [CataloniaDepartementCode.Lleida]: lleidaMessages_en
}
export const cataloniaMessages_en = RegionMessages.create("Catalonia",
  cataloniaDepartementsMessageList)
