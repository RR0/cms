import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { Organization } from "../../../../../Organization.js"
import { occitanie } from "../Occitanie.js"
import { OrganizationKind } from "../../../../../OrganizationKind"

export const tarnEtGaronne = new Organization(FranceDepartementCode.TarnEtGaronne,
  [Place.fromDMS(`43°38′N,3°15′E`)], OrganizationKind.department, occitanie)
