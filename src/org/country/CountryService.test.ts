import { describe, expect, test } from "vitest"
import { france } from "../eu/fr/France.js"
import { usa } from "../us/Usa.js"
import { cmsTestUtil } from "../../test/CMSTestUtil.js"

describe("CountryService", () => {

  test("get", () => {
    const countryService = cmsTestUtil.countryService
    expect(countryService.getById(france.id)).toBe(france)
    expect(countryService.getById(usa.id)).toBe(usa)
    expect(countryService.getById(usa.id)).not.toBe(france)
  })
})
