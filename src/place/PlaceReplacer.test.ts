import { PlaceReplacer } from "./PlaceReplacer"
import { PlaceService } from "./PlaceService"
import { Elevation, Place } from "./Place"
import { OrganizationService } from "../org/OrganizationService"
import { SsgContext } from "ssg-api"
import { rr0TestUtil } from "../test"
import { describe, expect, test } from "@javarome/testscript"
import { PlaceLocation } from "./PlaceLocation"
import { Organization, OrganizationKind } from "../org/Organization"
import { OrganizationMessages } from "../org"

class MockPlaceService extends PlaceService {

  constructor(readonly location: PlaceLocation, readonly elevation: Elevation, readonly dirName: string) {
    super("place")
  }

  async read(fileName: string): Promise<Place> {
    return new Place([this.location], this.elevation, this.dirName)
  }

  protected async geocode(address: string): Promise<{ location: PlaceLocation; data: any } | undefined> {
    return {location: this.location, data: {}}
  }

  protected async getElevation(location: PlaceLocation): Promise<Elevation> {
    return this.elevation
  }
}

class MockOrganizationService extends OrganizationService {

  constructor(readonly dirName: string) {
    super([], "org", null)
  }

  async read(_fileName: string): Promise<Organization> {
    let title = "Los Alamos National Laboratories"
    return {
      type: "org",
      kind: OrganizationKind.company,
      id: "laln",
      dirName: this.dirName,
      getTitle(_context: SsgContext): string {
        return title
      },
      places: [new Place([new PlaceLocation(35.87555555555556, -106.32416666666666)])],
      getMessages: (_context) => new OrganizationMessages([title]),
      events: []
    }
  }
}

describe("PlaceReplacer", () => {

  function createPlaceTag(doc: Document, text: string): HTMLSpanElement {
    const placeTag = doc.createElement("span")
    placeTag.className = "place"
    placeTag.innerHTML = text
    return placeTag
  }

  test("link to existing organization", async () => {
    return // Disable test
    const location = new PlaceLocation(35.8440582, -106.287162)
    const elevation = 2161.025390625
    const dirName = "org/us/state/nm/lanl/"
    const placeService = new MockPlaceService(location, {elevation}, dirName)
    const orgService = new MockOrganizationService(dirName)
    const replacer = new PlaceReplacer()
    const context = rr0TestUtil.newHtmlContext("people/a/AlexanderJohnB/index.html", "")
    const doc = context.file.document
    const text = "LANL"
    const placeTag = createPlaceTag(doc, text)
    const replacement = await replacer.replacement(context, placeTag) as HTMLAnchorElement
    expect(replacement.tagName).toBe("A")
    expect(replacement.className).toBe("plac")
    expect(replacement.href).toBe(`/${dirName}`)
    expect(replacement.textContent).toBe(text)
    expect(replacement.getAttribute("onclick")).toBe(`showMap(event,${location.lat},${location.lng},true)`)
  })

  test("link to non-existing organization", async () => {
    const location = new PlaceLocation(34.0, -105.0)
    const elevation = 100.0
    const dirName = ""
    const placeService = new MockPlaceService(location, {elevation}, dirName)
    const orgService = new MockOrganizationService(dirName)
    const replacer = new PlaceReplacer()
    const context = rr0TestUtil.newHtmlContext("people/a/AlexanderJohnB/index.html", "")
    const doc = context.file.document
    const text = "Non existing"
    const placeTag = createPlaceTag(doc, text)
    const replacement = await replacer.replacement(context, placeTag) as HTMLSpanElement
    expect(replacement.tagName).toBe("SPAN")
    expect(replacement.className).toBe("plac")
    expect(replacement.textContent).toBe(text)
    expect(replacement.getAttribute("onclick")).toBe(`showMap(event,'${text}',true)`)
  })

})