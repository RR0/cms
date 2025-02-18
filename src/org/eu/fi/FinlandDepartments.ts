import { northKareliaDepartments } from "./region/nk/NorthKareliaDepartments.js"
import { CmsOrganization } from "../../CmsOrganization.js"
import { pirkanmaaDepartments } from "./region/p/PirkanmaaDepartments.js"
import { southSavoDepartments } from "./region/ss/SouthSavoDepartments.js"

export const finlandDepartments: CmsOrganization[] = [
  ...northKareliaDepartments,
  ...pirkanmaaDepartments,
  ...southSavoDepartments
]
