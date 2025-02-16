import { Place } from "@rr0/place"
import { Organization } from "../../../../Organization.js"
import { OrganizationKind } from "../../../../OrganizationKind"

export class City<P extends Organization = Organization> extends Organization {
  /**
   *
   * @param code
   * @param parent
   * @param {Place[]} places A set of geo places that delimits the city (or its center by default)
   */
  constructor(code: string, parent: P, places: Place[]) {
    super(code, places, OrganizationKind.city, parent)
  }

  static create(code: string, parent: Organization, place: Place) {
    return new City(code, parent, [place])
  }
}
