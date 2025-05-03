import { describe, expect, test } from "@javarome/testscript"
import { OrganizationPlace } from "./OrganizationPlace.js"
import { parisCity } from "../org/eu/fr/region/idf/75/paris/Paris.js"
import { RR0Datasource } from "../time/datasource/rr0/RR0Datasource.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../org/country/CmsCountry.js"

describe("OrganizationPlace", () => {

  test("existing organization", async () => {
    const org = parisCity
    const place = new OrganizationPlace(org)
    expect(place.org).toBe(org)
    expect(place.locations).toBe(org.places[0].locations)
  })

  test("organization with no places", async () => {
    const org = new CmsCountry(CountryCode.jp)
    const place = new OrganizationPlace(org)
    expect(place.org).toBe(org)
    expect(place.locations).toEqual([])
  })

  test("toString", () => {
    expect(RR0Datasource.id(EdtfDate.fromString("1972-08-12"), new OrganizationPlace(parisCity))).toBe(
      "1972-08-12$city75000")
  })
})
