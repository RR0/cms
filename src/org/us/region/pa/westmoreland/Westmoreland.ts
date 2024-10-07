import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { Organization, OrganizationKind } from "../../../../Organization"
import { pennsylvania } from "../Pennsylvania"

export const westmoreland = new Organization(UsaCountyCode.westmoreland,
  [Place.fromDMS("40°19′N 79°28′W")], OrganizationKind.department, pennsylvania)
