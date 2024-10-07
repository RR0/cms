import { FranceRegionCode } from "../FranceRegionCode"
import { france } from "../../France"
import { Organization, OrganizationKind } from "../../../../Organization"

export const collectiviteOutreMer = new Organization(FranceRegionCode.com, [], OrganizationKind.region, france)
