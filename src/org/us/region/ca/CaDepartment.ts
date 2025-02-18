import { Place } from "@rr0/place"
import { CmsOrganization } from "../../../CmsOrganization.js"
import { california } from "./California.js"
import { OrganizationKind } from "@rr0/data"

export function caDepartment(code: string, place: Place): CmsOrganization {
  return new CmsOrganization(code, [place], OrganizationKind.department, california)
}
