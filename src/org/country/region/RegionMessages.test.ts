import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0Context } from "../../../RR0Context.js"
import { ileDeFrance } from "../../eu/fr/region/idf/Idf.js"
import { cmsTestUtil } from "../../../test/index.js"
import { france_fr } from "../../eu/fr/France_fr.js"
import { idfMessages } from "../../eu/fr/region/idf/IdfMessages.js"

describe("RegionMessages", () => {

  let context: RR0Context

  beforeEach(() => {
    context = cmsTestUtil.newContext(cmsTestUtil.filePath("time/1/9/7/0/03/index.html"))
  })

  test("toTitle", {skip: true}, () => {
    expect(idfMessages.toTitle(context, ileDeFrance)).toBe(idfMessages.title)
  })

  test("toTitle with country", {skip: true}, () => {
    expect(idfMessages.toTitle(context, ileDeFrance, {parent: true})).toBe(`${idfMessages.title}, ${france_fr.title}`)
  })
})
