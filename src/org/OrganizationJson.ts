import { OrganizationMessages } from "./OrganizationMessages.js"
import { TitleMessage } from "./TitleMessage.js"
import { OrganizationKind, RR0DataJson, RR0EventJson } from "@rr0/data"
import { Place } from "@rr0/place"

export class OrganizationJson<M extends TitleMessage = OrganizationMessages> implements RR0DataJson {

  readonly type = "org"

  dirName: string

  events: RR0EventJson[] = []

  readonly id: string

  places: Place[]

  kind: OrganizationKind

  /**
   * id of parent organization
   */
  parent?: string
}
