import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { Organization } from "../../../../../Organization.js"
import { occitanie } from "../Occitanie.js"
import { OrganizationKind } from "../../../../../OrganizationKind"

export const hauteVienne = new Organization(FranceDepartementCode.HauteVienne,
  [Place.fromDMS(`45°52′N,1° 15′E`)], OrganizationKind.department, occitanie)
