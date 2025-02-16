import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { Organization } from "../../../../../Organization.js"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { OrganizationKind } from "../../../../../OrganizationKind"

export const rhone = new Organization(FranceDepartementCode.Rhone, [Place.fromLocation(48, 0.316667)],
  OrganizationKind.department, auvergneRhoneAlpes)
