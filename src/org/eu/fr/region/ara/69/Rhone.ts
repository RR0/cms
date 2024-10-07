import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { Organization, OrganizationKind } from "../../../../../Organization.js"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"

export const rhone = new Organization(FranceDepartementCode.Rhone, [Place.fromLocation(48, 0.316667)],
  OrganizationKind.department, auvergneRhoneAlpes)
