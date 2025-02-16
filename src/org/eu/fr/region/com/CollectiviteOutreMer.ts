import { FranceRegionCode } from "../FranceRegionCode.js"
import { france } from "../../France.js"
import { Organization } from "../../../../Organization.js"
import { OrganizationKind } from "../../../../OrganizationKind"

export const collectiviteOutreMer = new Organization(FranceRegionCode.com, [], OrganizationKind.region, france)
