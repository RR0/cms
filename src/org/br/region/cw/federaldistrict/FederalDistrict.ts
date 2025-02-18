import { Place } from "@rr0/place"
import { BrazilDepartementCode } from "../../BrazilDepartementCode.js"
import { CmsOrganization } from "../../../../CmsOrganization.js"
import { centralWest } from "../CentralWest.js"
import { OrganizationKind } from "@rr0/data"

export const federalDistrict = new CmsOrganization(BrazilDepartementCode.federalDistrict,
  [Place.fromDMS(`47°03′N,122°07′W`)], OrganizationKind.department, centralWest)
