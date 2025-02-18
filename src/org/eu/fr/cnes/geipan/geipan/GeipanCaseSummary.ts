import { GeipanCaseClassification_calc } from "./GeipanCaseClassification.js"
import { GeipanSightingType } from "./GeipanSightingType.js"
import { GeipanZoneType } from "./GeipanCase.js"
import { FranceDepartementCode } from "../../../region/FranceDepartementCode.js"
import { FranceRegionCode } from "../../../region/FranceRegionCode.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { CountryCode } from "@rr0/data"

export type GeipanZoneCode = FranceDepartementCode | FranceRegionCode | CountryCode.fr

/**
 * caseNumber is like "AAAA-MM-number"
 */
export interface GeipanCaseSummary {
  id: string
  url: string
  time: EdtfDate
  sightingType?: GeipanSightingType
  city: string
  zoneCode?: GeipanZoneCode
  zoneType?: GeipanZoneType
  postTime: EdtfDate
  classification?: GeipanCaseClassification_calc
}
