import { Place } from "@rr0/place"
import { CmsOrganization } from "../../../CmsOrganization.js"
import { OrganizationKind } from "../../../../../../data/src/org/OrganizationKind"

export class Department extends CmsOrganization {
  /**
   *
   * @param code The unique code.
   * @param parent The above hierarchu.
   * @param places The geographical place of the department.
   */
  constructor(code: string, parent: CmsOrganization, places: Place[]) {
    super(code, places, OrganizationKind.department, parent)
  }

  static create(code: string, parent: CmsOrganization, place: Place) {
    return new Department(code, parent, [place])
  }
}
