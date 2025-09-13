import { describe, expect, test } from "@javarome/testscript"
import { france } from "../eu/fr/France.js"
import { usa } from "../us/Usa.js"
import { cmsTestUtil } from "../../test/index.js"

describe("CountryService", () => {

  test("get", () => {
    const countryService = cmsTestUtil.countryService
    expect(countryService.getById(france.id)).toBe(france)
    expect(countryService.getById(usa.id)).toBe(usa)
    expect(countryService.getById(usa.id)).not.toBe(france)
  })
})
