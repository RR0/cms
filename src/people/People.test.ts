import { People } from "./People.js"
import { PeopleService } from "./PeopleService.js"
import { describe, expect, test } from "@javarome/testscript"
import { rr0TestUtil } from "../test/index.js"
import path from "path"
import { AllDataService } from "@rr0/data"
import { Level2Date as EdtfDate } from "@rr0/time"

describe("People", () => {

  const peopleRoot = "src/people"
  const peopleFiles = [
    path.join(peopleRoot, "b/BeauJerome"),
    path.join(peopleRoot, "b/BeauJeromePierre"),
    path.join(peopleRoot, "h/HynekJosefAllen"),
    path.join(peopleRoot, "v/VonBraunWerner")
  ]
  const service = new PeopleService(new AllDataService([]), rr0TestUtil.peopleFactory, peopleFiles,
    rr0TestUtil.time.getService())

  test("age", async () => {
    const [hynek] = await service.getFromDir("HynekJosefAllen")
    expect(hynek.isDeceased()).toBe(false)
    expect(hynek.getAge()).toBe(undefined)

    Object.assign(hynek, {birthTime: EdtfDate.fromString("1910-05-01")})
    expect(hynek.isDeceased()).toBe(false)
    expect(hynek.isDeceased(EdtfDate.fromString("2040"))).toBe(true)
    expect(hynek.getAge(EdtfDate.fromString("1972-08-12"))).toBe(62)

    Object.assign(hynek, {deathTime: EdtfDate.fromString("1986-04-27")})
    expect(hynek.isDeceased()).toBe(true)
    expect(hynek.getAge(EdtfDate.fromString("1986-04-27"))).toBe(76)
    expect(hynek.getAge(EdtfDate.fromString("2020-04-27"))).toBe(76)
  })

  test("build url", () => {
    expect(People.getUrl("Beau", ["Jérôme"])).toBe("people/b/BeauJerome")
    expect(People.getUrl("Beau", ["Jérôme", "Pierre"])).toBe("people/b/BeauJeromePierre")
    expect(People.getUrl("VonBraun", ["Werner"])).toBe("people/v/VonBraunWerner")
  })
})
