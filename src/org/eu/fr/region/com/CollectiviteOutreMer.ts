import { FranceRegionCode } from "../FranceRegionCode.js"
import { france } from "../../France.js"
import { Organization, OrganizationKind } from "../../../../Organization.js"

export const collectiviteOutreMer = new Organization(FranceRegionCode.com, [], OrganizationKind.region, france)
