import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationKind } from "../../../../../Organization"
import { occitanie } from "../Occitanie"

export const hauteVienne = new Organization(FranceDepartementCode.HauteVienne,
  [Place.fromDMS(`45°52′N,1° 15′E`)], OrganizationKind.department, occitanie)
