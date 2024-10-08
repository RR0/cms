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
    expect(factory.createFromFullName("Jérôme Pierre Beau")).toEqual({
      title: "Beau, Jérôme Pierre",
      countries: [],
      lastName: "Beau",
      firstNames: ["Jérôme", "Pierre"],
      hoax: false,
      discredited: false,
      dirName: "people/b/BeauJeromePierre",
      occupations: [],
      pseudonyms: []
    })
  })

  test("build people with two last names", () => {
    expect(factory.createFromFullName("Werner VonBraun")).toEqual({
      title: "Von Braun, Werner",
      countries: [],
      lastName: "VonBraun",
      firstNames: ["Werner"],
      hoax: false,
      discredited: false,
      dirName: "people/v/VonBraunWerner",
      occupations: [],
      pseudonyms: []
    })
  })

  test("build people with one initial first names", () => {
    expect(factory.createFromFullName("Edward U. Condon")).toEqual({
      title: "Condon, Edward U.",
      countries: [],
      lastName: "Condon",
      firstNames: ["Edward", "U."],
      hoax: false,
      discredited: false,
      dirName: "people/c/CondonEdwardU",
      occupations: [],
      pseudonyms: []
    })
  })

  test("build people with last name first", () => {
    expect(factory.createFromFullName("Hynek, Josef Allen")).toEqual({
      title: "Hynek, Josef Allen",
      countries: [],
      lastName: "Hynek",
      firstNames: ["Josef", "Allen"],
      hoax: false,
      discredited: false,
      dirName: "people/h/HynekJosefAllen",
      occupations: [],
      pseudonyms: []
    })
  })

  test("Single name", () => {
    expect(factory.createFromFullName("Aristote")).toEqual({
      title: "Aristote",
      countries: [],
      lastName: "Aristote",
      firstNames: [],
      hoax: false,
      discredited: false,
      dirName: "people/a/Aristote",
      occupations: [],
      pseudonyms: []
    })
  })
})
