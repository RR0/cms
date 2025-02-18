import { describe, expect, test } from "@javarome/testscript"
import { CountryCode, Occupation, People, PeopleFactory, PeopleJson, RR0EventFactory } from "@rr0/data"

describe("PeopleFactory", () => {

  const eventFactory = new RR0EventFactory()
  const factory = new PeopleFactory(eventFactory)

  test("build people with two first names", () => {
    const villaJson: PeopleJson = {
      "birthTime": "1916-09-24",
      "deathTime": "1980-11-22",
      "occupations": [
        "contactee",
        "mechanic"
      ],
      "countries": [
        "us"
      ],
      "pseudonyms": [
        "Paul Villa"
      ]
    }
    const parsed = factory.parse(villaJson)
    const expected = new People(undefined, undefined, ["Paul Villa"], [Occupation.contactee, Occupation.mechanic],
      [CountryCode.us], true)
    expect(parsed).toEqual(expected)
  })
})
