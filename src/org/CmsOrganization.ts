import { RR0Context } from "../RR0Context.js"
import assert from "assert"
import { OrganizationMessageOptions, OrganizationMessages } from "./OrganizationMessages.js"
import { TitleMessage } from "./TitleMessage.js"
import { Organization, OrganizationKind } from "@rr0/data"
import { Place } from "@rr0/place"

export class CmsOrganization<M extends TitleMessage = OrganizationMessages> extends Organization {

  constructor(id: string, places: Place[], kind: OrganizationKind,
              parent?: CmsOrganization) {
    super(id, places, kind, parent)
  }

  get parent(): CmsOrganization | undefined {
    return super.parent as any as CmsOrganization
  }

  getMessages(context: RR0Context): M {
    const parent = this.parent as CmsOrganization
    const parentMessages = parent ? parent.getMessages(context) : context.messages
    const messageKind = parentMessages[this.kind]
    assert.ok(messageKind, `Could not find messages of kind "${this.kind}" in ${JSON.stringify(parentMessages)}`)
    const messages = messageKind[this.id]
    assert.ok(messages, `Could not find messages for org "${this.id}" in messages "${JSON.stringify(messageKind)}"`)
    return messages
  }

  getTitle(context: RR0Context, options: OrganizationMessageOptions = {parent: false}): string {
    const messages = this.getMessages(context)
    const parent = this.parent as CmsOrganization
    assert.ok(messages, `Could not find name of org "${this.id}" in parent org "${parent?.id}"`)
    let str = messages.title
    if (options.parent && parent) {
      const parentMessages = parent.getMessages(context)
      str += ` (${parentMessages.toTitle(context, parent, options)})`
    }
    return str
  }
}
