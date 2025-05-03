import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { france_fr } from "../eu/fr/France_fr.js"
import { rr0TestUtil } from "../../test/index.js"
import { RR0Context } from "../../RR0Context.js"
import { france_en } from "../eu/fr/France_en.js"
import { usa_fr } from "../us/Usa_fr.js"
import { usa_en } from "../us/Usa_en.js"
import { france } from "../eu/fr/France.js"
import { usa } from "../us/Usa.js"

describe("CountryMessages", () => {

  let context: RR0Context

  beforeEach(() => {
    context = rr0TestUtil.newContext(rr0TestUtil.filePath("time/1/9/7/0/03/index.html"))
  })

  test("toTitle", () => {
    expect(france_fr.toTitle(context, france, {parent: false})).toBe(france_fr.title)
    expect(france_en.toTitle(context, france, {parent: false})).toBe(france_en.title)
    expect(usa_fr.toTitle(context, usa, {parent: false})).toBe(usa_fr.title)
    expect(usa_en.toTitle(context, usa, {parent: false})).toBe(usa_en.title)
  })
})
