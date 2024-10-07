import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { Organization, OrganizationKind } from "../../../../../Organization.js"
import { occitanie } from "../Occitanie.js"

export const tarnEtGaronne = new Organization(FranceDepartementCode.TarnEtGaronne,
  [Place.fromDMS(`43°38′N,3°15′E`)], OrganizationKind.department, occitanie)
