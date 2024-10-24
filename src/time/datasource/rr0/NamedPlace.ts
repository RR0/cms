import { Place } from "../../../place"
import { Organization } from "../../../org"

export type NamedPlace = {
  readonly place?: Place
  readonly org?: Organization
  readonly name: string
}
