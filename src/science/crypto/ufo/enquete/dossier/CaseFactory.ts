import { RR0Case } from "./RR0Case.js"
import { RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { RR0CaseJson } from "./RR0CaseJson.js"
import { NamedPlace } from "@rr0/place"
import { Level2Date as EdtfDate } from "@rr0/time"

export class CaseFactory extends TypedDataFactory<RR0Case, RR0CaseJson> {

  parse(dataJson: RR0CaseJson): RR0Case {
    const parsedCase = super.parse(dataJson)
    parsedCase.time = EdtfDate.fromString(dataJson.time)
    parsedCase.place = new NamedPlace(dataJson.place)
    parsedCase.classification = dataJson.classification
    parsedCase.conclusion = dataJson.conclusion
    return parsedCase
  }

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "case")
  }
}
