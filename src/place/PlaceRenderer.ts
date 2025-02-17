import { OrganizationPlace } from "./OrganizationPlace"
import { NamedPlace, Place } from "@rr0/place"
import { HtmlRR0Context } from "../RR0Context"

/**
 * Convert a place to a <span class="place"> tag with the place name (or location)
 */
export class PlaceRenderer {

  render(context: HtmlRR0Context, place: Place): string {
    let placeName: string
    if (place instanceof OrganizationPlace) {
      const orgPlace = place as OrganizationPlace
      placeName = orgPlace.org.getTitle(context, {parent: true})
    } else if (place instanceof NamedPlace) {
      placeName = place.name
    } else {
      placeName = place.locations.map(location => location.toDMS(context.place)).join(",")
    }
    return placeName
  }
}
