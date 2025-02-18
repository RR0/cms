import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { CmsOrganization } from "../../../../../CmsOrganization.js"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { OrganizationKind } from "../../../../../../../../data/src/org/OrganizationKind"

export const rhone = new CmsOrganization(FranceDepartementCode.Rhone, [Place.fromLocation(48, 0.316667)],
  OrganizationKind.department, auvergneRhoneAlpes)
