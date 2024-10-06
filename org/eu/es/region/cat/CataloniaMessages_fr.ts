import { CataloniaDepartementCode } from "./CataloniaDepartementCode"
import { DepartmentMessages, RegionMessages } from "../../../../country"
import { lleidaMessages_fr } from "./lleida/LleidaMessages_fr"

const cataloniaDepartementsMessageList: { [key in CataloniaDepartementCode]: DepartmentMessages<any> } = {
  [CataloniaDepartementCode.Lleida]: lleidaMessages_fr
}
export const cataloniaMessages_fr = RegionMessages.create("Catalogne",
  cataloniaDepartementsMessageList)
