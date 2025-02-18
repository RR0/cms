import { Place } from "@rr0/place"
import { CmsOrganization } from "../../../../CmsOrganization.js"
import { OrganizationKind } from "../../../../../../../data/src/org/OrganizationKind"

export class City<P extends CmsOrganization = CmsOrganization> extends CmsOrganization {
  /**
   *
   * @param code
   * @param parent
   * @param {Place[]} places A set of geo places that delimits the city (or its center by default)
   */
  constructor(code: string, parent: P, places: Place[]) {
    super(code, places, OrganizationKind.city, parent)
  }

  static create(code: string, parent: CmsOrganization, place: Place) {
    return new City(code, parent, [place])
  }
}
