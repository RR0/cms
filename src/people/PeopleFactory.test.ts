import { PeopleService } from "./PeopleService.js"
import { People } from "./People.js"
import { describe, expect, test } from "@javarome/testscript"
import { rr0TestUtil } from "../test/index.js"

describe("PeopleFactory", () => {

  const dataService = rr0TestUtil.dataService
  const factory = new PeopleService(dataService, rr0TestUtil.peopleFactory)

  test("build people with one first name", () => {
    expect(factory.createFromFullName("Jérôme Beau")).toEqual(new People(
      ["Jérôme"],
      "Beau",
      [],
      [],
      [],
      false,
      undefined,
      undefined,
      undefined,
      "people/b/BeauJerome"
    ))
  })

  test("build people with two first names", () => {
    const people = factory.createFromFullName("Jérôme Pierre Beau")
    expect(people.title).toBe("Beau, Jérôme Pierre")
    expect(people.countries).toBe([])
    expect(people.lastName).toBe("Beau")
    expect(people.firstNames).toBe(["Jérôme", "Pierre"])
    expect(people.hoax).toBe(false)
    expect(people.discredited).toBe(false)
    expect(people.dirName).toBe("people/b/BeauJeromePierre")
    expect(people.occupations).toBe([])
    expect(people.pseudonyms).toBe([])
  })

  test("build people with two last names", () => {
    const people = factory.createFromFullName("Werner VonBraun")
    expect(people.title).toBe("Von Braun, Werner")
    expect(people.countries).toBe([])
    expect(people.lastName).toBe("VonBraun")
    expect(people.firstNames).toBe(["Werner"])
    expect(people.hoax).toBe(false)
    expect(people.discredited).toBe(false)
    expect(people.dirName).toBe("people/v/VonBraunWerner")
    expect(people.occupations).toBe([])
    expect(people.pseudonyms).toBe([])
  })

  test("build people with one initial first names", () => {
    const people = factory.createFromFullName("Edward U. Condon")
    expect(people.title).toBe("Condon, Edward U.")
    expect(people.countries).toBe([])
    expect(people.lastName).toBe("Condon")
    expect(people.firstNames).toBe(["Edward", "U."])
    expect(people.hoax).toBe(false)
    expect(people.discredited).toBe(false)
    expect(people.dirName).toBe("people/c/CondonEdwardU")
    expect(people.occupations).toBe([])
    expect(people.pseudonyms).toBe([])
  })

  test("build people with last name first", () => {
    const people = factory.createFromFullName("Hynek, Josef Allen")
    expect(people.title).toBe("Hynek, Josef Allen")
    expect(people.countries).toBe([])
    expect(people.lastName).toBe("Hynek")
    expect(people.firstNames).toBe(["Josef", "Allen"])
    expect(people.hoax).toBe(false)
    expect(people.discredited).toBe(false)
    expect(people.dirName).toBe("people/h/HynekJosefAllen")
    expect(people.occupations).toBe([])
    expect(people.pseudonyms).toBe([])
  })

  test("Single name", () => {
    const people = factory.createFromFullName("Aristote")
    expect(people.title).toBe("Aristote")
    expect(people.countries).toBe([])
    expect(people.lastName).toBe("Aristote")
    expect(people.firstNames).toBe([])
    expect(people.hoax).toBe(false)
    expect(people.discredited).toBe(false)
    expect(people.dirName).toBe("people/a/Aristote")
    expect(people.occupations).toBe([])
    expect(people.pseudonyms).toBe([])
  })
})
