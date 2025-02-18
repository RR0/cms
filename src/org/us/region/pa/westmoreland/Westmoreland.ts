import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { CmsOrganization } from "../../../../CmsOrganization.js"
import { pennsylvania } from "../Pennsylvania.js"
import { OrganizationKind } from "@rr0/data"

export const westmoreland = new CmsOrganization(UsaCountyCode.westmoreland,
  [Place.fromDMS("40°19′N 79°28′W")], OrganizationKind.department, pennsylvania)
