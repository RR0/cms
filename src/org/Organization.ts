import path from "path"
import { RR0Context } from "../RR0Context.js"
import assert from "assert"
import { OrganizationMessageOptions, OrganizationMessages } from "./OrganizationMessages.js"
import { TitleMessage } from "./TitleMessage.js"
import { RR0Data } from "../data/index.js"
import { RR0Event } from "../event/index.js"
import { Place } from "../place/index.js"

export enum OrganizationKind {
  country = "country",
  region = "region",
  department = "department",
  city = "city",
  company = "company",
}

export class Organization<M extends TitleMessage = OrganizationMessages> implements RR0Data {

  readonly type = "org"

  readonly dirName: string

  events: RR0Event[] = []

  constructor(readonly id: string, readonly places: Place[], readonly kind: OrganizationKind,
              readonly parent?: Organization) {
    assert.ok(id, `id must be defined for organization of type ${kind}`)
    this.dirName = path.join(parent?.dirName ?? "org/", id)
    assert.ok(id, `Code must be defined for organization of type ${kind}`)
  }

  getMessages(context: RR0Context): M {
    const parent = this.parent as Organization
    const parentMessages = parent ? parent.getMessages(context) : context.messages
    const messageKind = parentMessages[this.kind]
    assert.ok(messageKind, `Could not find messages of kind "${this.kind}" in ${JSON.stringify(parentMessages)}`)
    const messages = messageKind[this.id]
    assert.ok(messages, `Could not find messages for org "${this.id}" in messages "${JSON.stringify(messageKind)}"`)
    return messages
  }

  getTitle(context: RR0Context, options: OrganizationMessageOptions = {parent: false}): string {
    const messages = this.getMessages(context)
    const parent = this.parent as Organization
    assert.ok(messages, `Could not find name of org "${this.id}" in parent org "${parent?.id}"`)
    let str = messages.title
    if (options.parent && parent) {
      const parentMessages = parent.getMessages(context)
      str += ` (${parentMessages.toTitle(context, parent, options)})`
    }
    return str
  }
}
