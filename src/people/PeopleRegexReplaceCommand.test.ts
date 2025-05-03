import path from "path"
import { ClassDomReplaceCommand } from "ssg-api"
import { describe, expect, test } from "@javarome/testscript"
import { PeopleReplacerFactory } from "./PeopleReplacerFactory.js"
import { rr0TestUtil } from "../test/index.js"
import { PeopleHtmlRenderer } from "./PeopleHtmlRenderer.js"
import { PeopleService } from "@rr0/data"

describe("ClassDomReplaceCommand", () => {

  test("replaces", {skip: true}, async () => {
    const peopleRoot = "src/people"
    const peopleFiles = [path.join(peopleRoot, "b/BeauJerome")]
    const peopleRenderer = new PeopleHtmlRenderer()
    const peopleService = new PeopleService(rr0TestUtil.dataService, rr0TestUtil.peopleFactory,
      {files: peopleFiles, rootDir: peopleRoot})
    const command = new ClassDomReplaceCommand(
      new PeopleReplacerFactory(peopleService, peopleRenderer), "people")
    const context = rr0TestUtil.time.newHtmlContext("1/9/9/0/08/index.html", `<span class="people">Jérôme Beau</span>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head></head><body><span title="1972-, 50 ans, France, ufologue, Informaticien" class="country-fr occupation-ufologist occupation-softwareEngineer" translate="no"><a href="/src/people/b/BeauJerome/">Jérôme Beau</a></span></body></html>`)
  })
})
