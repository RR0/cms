import { describe, expect, test } from "@javarome/testscript"
import { france } from "../eu/fr/France.js"
import { usa } from "../us/Usa.js"
import { rr0TestUtil } from "../../test"

describe("CountryService", () => {

  test("get", () => {
    const countryService = rr0TestUtil.countryService
    expect(countryService.get(france.id)).toBe(france)
    expect(countryService.get(usa.id)).toBe(usa)
    expect(countryService.get(usa.id)).not.toBe(france)
  })
})
