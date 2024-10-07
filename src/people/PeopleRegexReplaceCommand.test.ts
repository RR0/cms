import { PeopleReplacerFactory } from "./PeopleReplacerFactory.js"
import { rr0TestUtil } from "../test/index.js"
import { ClassDomReplaceCommand } from "ssg-api"
import { describe, expect, test } from "@javarome/testscript"
import { PeopleService } from "./PeopleService.js"

describe("ClassDomReplaceCommand", () => {

  test("replaces", async () => {
    const command = new ClassDomReplaceCommand(
      new PeopleReplacerFactory(new PeopleService(rr0TestUtil.dataService, rr0TestUtil.peopleFactory)), "people")
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", `<span class="people">Jérôme Beau</span>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head></head><body><span title="1972-, 50 ans, France, ufologue, Informaticien" class="country-fr occupation-ufologist occupation-softwareEngineer" translate="no"><a href="/src/people/b/BeauJerome/">Jérôme Beau</a></span></body></html>`)
  })
})
