import { GeipanCaseClassification_calc } from "./GeipanCaseClassification.js"
import { GeipanSightingType } from "./GeipanSightingType.js"
import { GeipanZoneType } from "./GeipanCase.js"
import { FranceDepartementCode } from "../../../region/FranceDepartementCode.js"
import { FranceRegionCode } from "../../../region/FranceRegionCode.js"
import { CountryCode } from "../../../../../country/index.js"
import { TimeContext } from "../../../../../../time/index.js"

export type GeipanZoneCode = FranceDepartementCode | FranceRegionCode | CountryCode.fr

/**
 * caseNumber is like "AAAA-MM-number"
 */
export interface GeipanCaseSummary {
  id: string
  url: string
  time: TimeContext
  sightingType?: GeipanSightingType
  city: string
  zoneCode?: GeipanZoneCode
  zoneType?: GeipanZoneType
  postTime: TimeContext
  classification?: GeipanCaseClassification_calc
}
