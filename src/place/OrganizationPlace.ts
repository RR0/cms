import { CmsOrganization } from "../org"
import { Place } from "@rr0/place"

export class OrganizationPlace extends Place {

  constructor(readonly org: CmsOrganization) {
    super(org.places[0]?.locations || [], org.places[0]?.elevation, org.places[0]?.dirName)
    Object.assign(this, org.places[0])
  }

  toString() {
    return this.org?.toString() ?? super.toString()
  }
}
