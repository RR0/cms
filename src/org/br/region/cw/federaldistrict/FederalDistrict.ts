import { Place } from "@rr0/place"
import { BrazilDepartementCode } from "../../BrazilDepartementCode.js"
import { Organization } from "../../../../Organization.js"
import { centralWest } from "../CentralWest.js"
import { OrganizationKind } from "../../../../OrganizationKind"

export const federalDistrict = new Organization(BrazilDepartementCode.federalDistrict,
  [Place.fromDMS(`47°03′N,122°07′W`)], OrganizationKind.department, centralWest)
