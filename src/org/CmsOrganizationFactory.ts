import { CmsOrganization } from "./CmsOrganization.js"
import { OrganizationFactory, OrganizationJson, RR0EventFactory } from "@rr0/data"

export class CmsOrganizationFactory extends OrganizationFactory<CmsOrganization, OrganizationJson> {

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
