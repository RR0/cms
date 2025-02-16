import { RR0Case } from "./RR0Case.js"
import { RR0EventFactory, TypedDataFactory } from "@rr0/data"
import { RR0CaseJson } from "./RR0CaseJson.js"

export class CaseFactory extends TypedDataFactory<RR0Case, RR0CaseJson> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "case")
  }
}
