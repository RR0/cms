import { CmsOrganization } from "./CmsOrganization.js"
import { RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { OrganizationJson } from "./OrganizationJson"

export class OrganizationFactory extends TypedDataFactory<CmsOrganization, OrganizationJson> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "org", ["index"])
  }

  parse(dataJson: OrganizationJson): CmsOrganization {
    const base = super.parse(dataJson)
    const id = base.id || dataJson.dirName.replaceAll("/", "-")
    return new CmsOrganization(id, dataJson.places, dataJson.kind)
  }
}
