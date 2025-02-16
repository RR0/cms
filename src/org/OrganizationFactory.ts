import { Organization } from "./Organization.js"
import { RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { OrganizationJson } from "./OrganizationJson"

export class OrganizationFactory extends TypedDataFactory<Organization, OrganizationJson> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "org", ["index"])
  }

  parse(dataJson: OrganizationJson): Organization {
    const base = super.parse(dataJson)
    const id = base.id || dataJson.dirName.replaceAll("/", "-")
    return new Organization(id, dataJson.places, dataJson.kind)
  }
}
