import { describe, expect, test } from "@javarome/testscript"
import { hautsDeSeine } from "../../../eu/fr/region/idf/92/HautsDeSeine.js"
import { ileDeFrance } from "../../../eu/fr/region/idf/Idf.js"
import { sanDiego } from "../../../us/region/ca/sandiego/SanDiego.js"
import { california } from "../../../us/region/ca/California.js"
import { cmsTestUtil } from "../../../../test/index.js"

describe("DepartmentService", () => {

  test("get", () => {
    const departmentService = cmsTestUtil.departmentService
    expect(departmentService.getById(hautsDeSeine.id, ileDeFrance)).toBe(hautsDeSeine)
    expect(departmentService.getById(hautsDeSeine.id, undefined)).toBe(hautsDeSeine)
    expect(departmentService.getById(sanDiego.id, california)).toBe(sanDiego)
  })
})
