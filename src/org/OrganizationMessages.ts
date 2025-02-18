import { RR0Context } from "../RR0Context.js"
import assert from "assert"
import { CmsOrganization } from "./CmsOrganization.js"

export interface OrganizationMessageOptions {
  parent: boolean
}

export class OrganizationMessages {

  readonly titles: string[]

  /**
   *
   * @param {string[]} titles The raw title.
   * @see toTitle() for more complex title strings.
   */
  constructor(titles: string[]) {
    this.titles = titles
  }

  get title(): string {
    return this.titles[0]
  }

  toTitle(context: RR0Context, org: CmsOrganization, options: OrganizationMessageOptions = {parent: true}): string {
    const orgMessages = org.getMessages(context)
    assert.ok(orgMessages,
      `Could not find name of city with ZIP code "${org.id}" in departement "${org.parent?.id}"`)
    let title = orgMessages.title
    return this.toTitleFromName(context, org, title, options)
  }

  toTitleFromName(context: RR0Context, org: CmsOrganization, title: string, options: OrganizationMessageOptions) {
    let str = org.getMessages(context).cityName(title)
    if (options.parent) {
      const parent = org.parent
      if (parent) {
        const depMessages = parent.getMessages(context)
        const parentStr = depMessages.toTitle(context, parent, options)
        str += ` (${parentStr})`
      }
    }
    return str
  }

  cityName(cityStr: string): string {
    return cityStr.trim()
  }
}
