import { Place } from "../../../../../place/Place"
import { Organization, OrganizationKind } from "../../../../Organization"

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
