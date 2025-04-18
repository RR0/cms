import assert from "assert"
import { RR0Context } from "../RR0Context.js"

import { CmsOrganization } from "./CmsOrganization.js"
import { OrganizationMessageOptions } from "./OrganizationMessages.js"

export class OrgMessages {

  readonly titles: string[]

  /**
   *
   * @param {string[]} titles The raw title.
   * @see toTitle() for more complex title strings.
   */
  constructor(...titles: string[]) {
    this.titles = titles
  }

  get title(): string {
    return this.titles[0]
  }

  toTitle(context: RR0Context, org: CmsOrganization<any>, opts?: OrganizationMessageOptions): string {
    const options = opts || {parent: false}
    const OrgMessages = org.getMessages(context)
    assert.ok(OrgMessages, `Could not find organization "${org.id}" in organization "${org.parent.id}"`)
    let str = OrgMessages.title
    if (options.parent) {
      const parent = org.parent
      const parentMessages = parent.getMessages(context)
      str += ` (${parentMessages.toTitle(context, parent, options)})`
    }
    return str
  }
}
