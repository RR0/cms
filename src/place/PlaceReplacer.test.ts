import { PlaceReplacer } from "./PlaceReplacer.js"
import { OrganizationService } from "../org/OrganizationService.js"
import { SsgContext } from "ssg-api"
import { cmsTestUtil } from "../test/index.js"
import { describe, expect, test } from "@javarome/testscript"
import { CmsOrganization } from "../org/CmsOrganization.js"
import { OrganizationMessages } from "../org/index.js"
import { Elevation, Place, PlaceLocation, PlaceService } from "@rr0/place"
import { OrganizationKind } from "@rr0/data"

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
    super(null!, cmsTestUtil.orgFactory, {rootDir: "", files: []}, null, [])
  }

  async read(_fileName: string): Promise<CmsOrganization> {
    let title = "Los Alamos National Laboratories"
    return {
      type: "org",
      kind: OrganizationKind.company,
      id: "laln",
      dirName: this.dirName,
      getTitle(_context: SsgContext): string {
        return title
      },
      parent: undefined,
      title,
      places: [new Place([new PlaceLocation(35.87555555555556, -106.32416666666666)])],
      getMessages: (_context) => new OrganizationMessages([title]),
      events: []
    } as CmsOrganization
  }
}

describe("PlaceReplacer", () => {

  function createPlaceTag(doc: Document, text: string): HTMLSpanElement {
    const placeTag = doc.createElement("span")
    placeTag.className = "place"
    placeTag.innerHTML = text
    return placeTag
  }

  test("link to existing organization", {skip: true}, async () => {
    const location = new PlaceLocation(35.8440582, -106.287162)
    const elevation = 2161.025390625
    const dirName = "org/us/state/nm/lanl/"
    const placeService = new MockPlaceService(location, {elevation}, dirName)
    const orgService = new MockOrganizationService(dirName)
    const replacer = new PlaceReplacer()
    const context = cmsTestUtil.newHtmlContext("people/a/AlexanderJohnB/index.html", "")
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
    const replacer = new PlaceReplacer()
    const context = cmsTestUtil.newHtmlContext("people/a/AlexanderJohnB/index.html", "")
    const doc = context.file.document
    const text = "Non existing"
    const placeTag = createPlaceTag(doc, text)
    const replacement = await replacer.replacement(context, placeTag) as HTMLSpanElement
    expect(replacement.tagName).toBe("SPAN")
    expect(replacement.className).toBe("plac")
    expect(replacement.textContent).toBe(text)
    //expect(replacement.getAttribute("onclick")).toBe(`showMap(event,'${text}',true)`)
  })

})
