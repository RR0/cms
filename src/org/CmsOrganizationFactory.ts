import { CmsOrganization } from "./CmsOrganization.js"
import { OrganizationFactory, RR0EventFactory } from "@rr0/data"
import { OrganizationJson } from "@rr0/data/dist/org/OrganizationJson"

export class CmsOrganizationFactory extends OrganizationFactory {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory)
  }

  parse(dataJson: OrganizationJson): CmsOrganization {
    const base = super.parse(dataJson)
    const org = new CmsOrganization(base.id, base.places, base.kind)
    org.title = base.title
    return org
  }
}
