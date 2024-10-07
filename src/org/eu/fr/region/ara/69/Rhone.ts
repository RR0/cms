import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationKind } from "../../../../../Organization"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const rhone = new Organization(FranceDepartementCode.Rhone, [Place.fromLocation(48, 0.316667)],
  OrganizationKind.department, auvergneRhoneAlpes)
