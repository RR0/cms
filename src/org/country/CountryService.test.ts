import { describe, expect, test } from "@javarome/testscript"
import { france } from "../eu/fr/France.js"
import { usa } from "../us/Usa.js"
import { rr0TestUtil } from "../../test/index.js"

describe("CountryService", () => {

  test("get", () => {
    const countryService = rr0TestUtil.countryService
    expect(countryService.getById(france.id)).toBe(france)
    expect(countryService.getById(usa.id)).toBe(usa)
    expect(countryService.getById(usa.id)).not.toBe(france)
  })
})
