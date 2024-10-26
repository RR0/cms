import { Organization } from "./Organization.js"
import { RR0EventFactory, TypedDataFactory } from "@rr0/data"

export class OrganizationFactory extends TypedDataFactory<Organization> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "org", ["index"])
  }

  createFromData(data: Organization): Organization {
    const id = data.id || data.dirName.replaceAll("/", "-")
    const org = new Organization(id, data.places, data.kind, data.parent)
    Object.assign(org, super.createFromData(data))
    return org
  }
}
