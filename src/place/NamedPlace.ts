import { Place } from "@rr0/place"

export class NamedPlace extends Place {

  constructor(readonly name: string) {
    super([])
  }
}
