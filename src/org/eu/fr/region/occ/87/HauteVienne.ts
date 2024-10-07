import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { Organization, OrganizationKind } from "../../../../../Organization.js"
import { occitanie } from "../Occitanie.js"

export const hauteVienne = new Organization(FranceDepartementCode.HauteVienne,
  [Place.fromDMS(`45°52′N,1° 15′E`)], OrganizationKind.department, occitanie)
