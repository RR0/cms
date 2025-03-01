import { Place } from "@rr0/place"
import { CmsOrganization } from "../CmsOrganization.js"
import { CountryCode, OrganizationKind } from "@rr0/data"

export class CmsCountry extends CmsOrganization {

  constructor(code: CountryCode, places: Place[] = []) {
    super(code, places, OrganizationKind.country)
  }
}
