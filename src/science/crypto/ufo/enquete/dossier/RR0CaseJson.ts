import { RR0CaseSummaryJson } from "../../../../../time/datasource/rr0/RR0CaseSummaryJson.js"
import { CaseConclusion } from "./CaseConclusion.js"
import { HynekClassification } from "./HynekClassification.js"

export interface RR0CaseJson extends RR0CaseSummaryJson {
  classification?: {
    hynek: HynekClassification
  },
  conclusion?: CaseConclusion
}
