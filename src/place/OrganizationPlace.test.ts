import { describe, expect, test } from "@javarome/testscript"
import { OrganizationPlace } from "./OrganizationPlace"
import { parisCity } from "../org/eu/fr/region/idf/75/paris/Paris"
import { RR0Datasource } from "../time"
import { Level2Date as EdtfDate } from "@rr0/time"
import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../org/country/CmsCountry"

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
      "1972-08-12$city$75000")
  })
})
