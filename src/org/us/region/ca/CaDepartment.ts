import { Place } from "@rr0/place"
import { Organization } from "../../../Organization.js"
import { california } from "./California.js"
import { OrganizationKind } from "../../../OrganizationKind"

export function caDepartment(code: string, place: Place): Organization {
  return new Organization(code, [place], OrganizationKind.department, california)
}
