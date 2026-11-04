import { RR0Case } from "./RR0Case.js"
import { EventTime, RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { RR0CaseJson } from "./RR0CaseJson.js"
import { NamedPlace } from "@rr0/place"

export class CaseFactory extends TypedDataFactory<RR0Case, RR0CaseJson> {

  parse(dataJson: RR0CaseJson): RR0Case {
    const parsedCase = super.parse(dataJson)
    const time = dataJson.time
    if (time) {
      Object.assign(parsedCase, {time: EventTime.parse(time)})
    }
    // A place of RR0 by its name, or the place itself (PlaceJson), as @rr0/data reads an event's.
    const place = dataJson.place
    if (place) {
      parsedCase.place = NamedPlace.fromJson(place)
    }
    parsedCase.classification = dataJson.classification
    parsedCase.conclusion = dataJson.conclusion
    return parsedCase
  }

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "case")
  }
}
