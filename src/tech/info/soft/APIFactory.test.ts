import { describe, expect, test } from "vitest"
import { RR0EventFactory } from "@rr0/data"
import { APIFactory } from "./APIFactory.js"
import { APIJson } from "./APIJson.js"

describe("APIFactory", () => {

  const factory = new APIFactory(new RR0EventFactory())

  test("keeps the title, which becomes the page title", () => {
    const api = factory.parse({type: "api", title: "JNLP", url: "https://www.jcp.org/en/jsr/detail?id=56"} as APIJson)
    expect(api.title).toBe("JNLP")
    expect(api.url).toBe("https://www.jcp.org/en/jsr/detail?id=56")
  })

  test("accepts an api.json without events", () => {
    const api = factory.parse({type: "api", title: "JOGL"} as APIJson)
    expect(api.events).toEqual([])
  })
})
