import { describe, expect, test } from "@javarome/testscript"
import { ileDeFrance } from "../../eu/fr/region/idf/Idf.js"
import { france } from "../../eu/fr/France.js"
import { alabama } from "../../us/region/al/Alabama.js"
import { usa } from "../../us/Usa.js"
import { cmsTestUtil } from "../../../test/index.js"

describe("RegionService", () => {

  test("get", () => {
    const regionService = cmsTestUtil.regionService
    expect(regionService.getById(ileDeFrance.id, france)).toBe(ileDeFrance)
    expect(regionService.getById(alabama.id, usa)).toBe(alabama)
    expect(regionService.getById(alabama.id, france)).toBeUndefined()
  })
})
