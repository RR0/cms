import { RR0Case } from "./RR0Case.js"
import { RR0EventFactory, TypedDataFactory } from "@rr0/data"

export class CaseFactory extends TypedDataFactory<RR0Case> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "case")
  }
}
