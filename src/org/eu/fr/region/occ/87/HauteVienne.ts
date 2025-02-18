import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { CmsOrganization } from "../../../../../CmsOrganization.js"
import { occitanie } from "../Occitanie.js"
import { OrganizationKind } from "../../../../../../../../data/src/org/OrganizationKind"

export const hauteVienne = new CmsOrganization(FranceDepartementCode.HauteVienne,
  [Place.fromDMS(`45°52′N,1° 15′E`)], OrganizationKind.department, occitanie)
