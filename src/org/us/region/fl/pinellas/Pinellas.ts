import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { Organization } from "../../../../Organization.js"
import { florida } from "../Florida.js"
import { OrganizationKind } from "../../../../OrganizationKind"

export const pinellas = new Organization(UsaCountyCode.pinellas, [Place.fromDMS("27°54′N 82°44′W")],
  OrganizationKind.department, florida)
