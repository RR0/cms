import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { Organization, OrganizationKind } from "../../../../Organization.js"
import { pennsylvania } from "../Pennsylvania.js"

export const westmoreland = new Organization(UsaCountyCode.westmoreland,
  [Place.fromDMS("40°19′N 79°28′W")], OrganizationKind.department, pennsylvania)
