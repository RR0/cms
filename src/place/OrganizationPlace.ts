import { Organization } from "../org"
import { Place } from "@rr0/place"

export class OrganizationPlace extends Place {

  constructor(readonly org: Organization) {
    super(org.places[0].locations, org.places[0].elevation, org.places[0].dirName)
    Object.assign(this, org.places[0])
  }
}
