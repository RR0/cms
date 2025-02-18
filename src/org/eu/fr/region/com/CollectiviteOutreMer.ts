import { FranceRegionCode } from "../FranceRegionCode.js"
import { france } from "../../France.js"
import { CmsOrganization } from "../../../../CmsOrganization.js"
import { OrganizationKind } from "@rr0/data"

export const collectiviteOutreMer = new CmsOrganization(FranceRegionCode.com, [], OrganizationKind.region, france)
