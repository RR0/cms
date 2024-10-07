import { DepartmentMessages, RegionMessages } from "../../../../country"
import { MartiniqueDepartementCode } from "./MartiniqueDepartementCode"
import { martinique972Messages } from "./972/MartiniqueMessages"

const laReunionDepartmentsMessages_en: { [key in MartiniqueDepartementCode]: DepartmentMessages<any> } = {
  [MartiniqueDepartementCode.Martinique]: martinique972Messages
}
export const martiniqueRegionMessage = RegionMessages.create<{ [key in MartiniqueDepartementCode]: DepartmentMessages<any> }>(
  "Martinique", laReunionDepartmentsMessages_en
)
