import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { CmsOrganization } from "../../../../../CmsOrganization.js"
import { occitanie } from "../Occitanie.js"
import { OrganizationKind } from "@rr0/data"

export const tarnEtGaronne = new CmsOrganization(FranceDepartementCode.TarnEtGaronne,
  [Place.fromDMS(`43°38′N,3°15′E`)], OrganizationKind.department, occitanie)
