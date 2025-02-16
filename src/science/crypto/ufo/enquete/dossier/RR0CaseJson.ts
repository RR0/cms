import { RR0CaseSummaryJson } from "../../../../../time/datasource/rr0/RR0CaseSummaryJson"
import { CaseConclusion } from "./CaseConclusion"
import { HynekClassification } from "./HynekClassification"

export interface RR0CaseJson extends RR0CaseSummaryJson {
  classification?: {
    hynek: HynekClassification
  },
  conclusion?: CaseConclusion
}
