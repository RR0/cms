import { describe, expect, test } from "@javarome/testscript"
import { ileDeFrance } from "../../eu/fr/region/idf/Idf.js"
import { france } from "../../eu/fr/France.js"
import { alabama } from "../../us/region/al/Alabama.js"
import { usa } from "../../us/Usa.js"
import { rr0TestUtil } from "../../../test"

describe("RegionService", () => {

  test("get", () => {
    const regionService = rr0TestUtil.regionService
    expect(regionService.get(ileDeFrance.id, france)).toBe(ileDeFrance)
    expect(regionService.get(alabama.id, usa)).toBe(alabama)
    expect(regionService.get(alabama.id, france)).toBeUndefined()
  })
})
