import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0Context } from "../../../RR0Context.js"
import { ileDeFrance } from "../../eu/fr/region/idf/Idf.js"
import { rr0TestUtil } from "../../../test/index.js"
import { france_fr } from "../../eu/fr/France_fr.js"
import { idfMessages } from "../../eu/fr/region/idf/IdfMessages.js"

describe("RegionMessages", () => {

  let context: RR0Context

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
  })

  test("toTitle", () => {
    expect(idfMessages.toTitle(context, ileDeFrance)).toBe(idfMessages.title)
  })

  test("toTitle with country", () => {
    expect(idfMessages.toTitle(context, ileDeFrance, {parent: true})).toBe(`${idfMessages.title}, ${france_fr.title}`)
  })
})
