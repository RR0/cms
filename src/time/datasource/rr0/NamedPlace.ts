import { Place } from "../../../place/index.js"
import { Organization } from "../../../org/index.js"

export type NamedPlace = {
  readonly place?: Place
  readonly org?: Organization
  readonly name: string
}
