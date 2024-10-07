import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { ileDeFrance } from "../../eu/fr/region/idf/Idf"
import { rr0TestUtil } from "../../../test"
import { france_fr } from "../../eu/fr/France_fr"
import { idfMessages } from "../../eu/fr/region/idf/IdfMessages"

describe("RegionMessages", () => {

  let context: RR0SsgContext

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
