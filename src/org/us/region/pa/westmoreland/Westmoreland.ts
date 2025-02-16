import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { Organization } from "../../../../Organization.js"
import { pennsylvania } from "../Pennsylvania.js"
import { OrganizationKind } from "../../../../OrganizationKind"

export const westmoreland = new Organization(UsaCountyCode.westmoreland,
  [Place.fromDMS("40°19′N 79°28′W")], OrganizationKind.department, pennsylvania)
