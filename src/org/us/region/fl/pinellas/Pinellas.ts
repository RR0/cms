import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { CmsOrganization } from "../../../../CmsOrganization.js"
import { florida } from "../Florida.js"
import { OrganizationKind } from "@rr0/data"

export const pinellas = new CmsOrganization(UsaCountyCode.pinellas, [Place.fromDMS("27°54′N 82°44′W")],
  OrganizationKind.department, florida)
