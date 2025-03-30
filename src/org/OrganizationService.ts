import { CmsOrganization } from "./CmsOrganization.js"
import { StringUtil } from "../util/string/StringUtil.js"
import { RR0Context } from "../RR0Context.js"
import assert from "assert"
import { CmsOrganizationFactory } from "./CmsOrganizationFactory.js"
import { FileContents } from "@javarome/fileutil"
import { AbstractDataService, AllDataService, OrganizationJson } from "@rr0/data"
import { DataOptions } from "../DataOptions.js"

export type OrganizationServiceConfig = DataOptions

export class OrganizationService<O extends CmsOrganization = CmsOrganization, P extends CmsOrganization = undefined> extends AbstractDataService<O, OrganizationJson> {

  constructor(dataService: AllDataService, factory: CmsOrganizationFactory, protected config: OrganizationServiceConfig,
              readonly parentService: OrganizationService, protected orgs: O[]) {
    super(dataService, factory as any, config.files)
  }

  static normalizeName(name: string): string {
    return StringUtil.removeAccents(name.toLowerCase().replaceAll(" ", "-"))
  }

  getById(code: string, parent: P = undefined): O | undefined {
    return this.orgs.find(org => {
      const foundParent = !parent || org.parent === parent
      const foundOrg = org.id === code ? org : undefined
      const found = foundParent && foundOrg
      return found ? org : undefined
    })
  }

  /**
   * @param context
   * @param nameToFind
   * @param parent should be context.placeContext
   */
  find(context: RR0Context, nameToFind: string, parent: P): O | undefined {
    let foundOrg = this.orgs.find(someOrg => {
      const someOrgMessages = someOrg.getMessages(context)
      assert.ok(someOrgMessages, `Organization with code "${someOrg.id}" has no messages`)
      let found: boolean
      const someNameToFind = this.nameToFind(context, someOrg, nameToFind)
      const hasParent = Boolean(parent?.id)
      const parentCheck = !hasParent || parent.id === someOrg.parent.id
      if (parentCheck) {
        let foundName: boolean
        for (let i = 0; !foundName && i < someOrgMessages.titles.length; i++) {
          const depName = OrganizationService.normalizeName(
            someOrgMessages.toTitleFromName(context, someOrg, someOrgMessages.titles[i], {parent: false}))
          const depCityName = OrganizationService.normalizeName(depName)
          foundName = depCityName === someNameToFind
        }
        found = foundName
      } else {
        found = false
      }
      return found ? someOrg : undefined
    })
    if (this.parentService && !foundOrg) {
      foundOrg = this.parentService.find(context, nameToFind, undefined) as any
    }
    return foundOrg
  }

  async read(fileName: string): Promise<O> {
    const file = FileContents.read(this.config.rootDir + fileName)
    const org = this.factory.createFromFile(file) as O
    this.orgs.push(org)
    return org
  }

  protected nameToFind(context: RR0Context, org: O, nameToFind: string) {
    return OrganizationService.normalizeName(nameToFind)
  }
}
