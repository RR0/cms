import { PeopleReplacer } from "./PeopleReplacer.js"
import { cmsTestUtil } from "../test/index.js"
import { HtmlRR0Context } from "../RR0Context.js"
import { describe, expect, test } from "@javarome/testscript"
import path from "path"
import { AllDataService, PeopleFactory, PeopleService, RR0EventFactory } from "@rr0/data"
import { PeopleHtmlRenderer } from "./PeopleHtmlRenderer.js"

describe("PeopleReplacer", () => {

  const rootDir = cmsTestUtil.filePath("people")
  const files = [
    path.join(rootDir, "j/Jésus"),
    path.join(rootDir, "b/BeauJerome"),
    path.join(rootDir, "j/Jesus"),
    path.join(rootDir, "h/HynekJosefAllen"),
    path.join(rootDir, "r/ReaganRonald"),
    path.join(rootDir, "v/VertongenJeanLuc")
  ]

  const peopleFactory = new PeopleFactory(new RR0EventFactory())

  function createPeopleElement(context: HtmlRR0Context, content: string, title?: string): HTMLSpanElement {
    const peopleElement = context.file.document.createElement("span") as HTMLSpanElement
    peopleElement.textContent = content
    if (title) {
      peopleElement.title = title
    }
    return peopleElement
  }

  test("ignore brackets", {skip: true}, async () => {
    const dataService = new AllDataService([peopleFactory])
    const peopleService = new PeopleService(dataService, peopleFactory, {rootDir, files})
    const peopleRenderer = new PeopleHtmlRenderer()
    const replacer = new PeopleReplacer(peopleService, peopleRenderer)
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
    {
      const lastnameFirstElement = createPeopleElement(context,
        "Hynek, Josef Allen (Northwestern University, Evanston, Illinois)")
      const replacement = await replacer.replacement(context, lastnameFirstElement)
      expect(replacement.outerHTML).toBe(
        `<span title="1910-1986, 76 ans, USA, ufologue, astronome" class="deceased country-us occupation-ufologist occupation-astronomer" translate="no"><a href="/src/people/h/HynekJosefAllen/">Hynek, Josef Allen (Northwestern University, Evanston, Illinois)</a></span>`)
    }
    {
      const firstnameFirstElement = createPeopleElement(context,
        "Josef Allen Hynek (Northwestern University, Evanston, Illinois)")
      const replacement = await replacer.replacement(context, firstnameFirstElement)
      expect(replacement.outerHTML).toBe(
        `<span title="1910-1986, 76 ans, USA, ufologue, astronome" class="deceased country-us occupation-ufologist occupation-astronomer" translate="no"><a href="/src/people/h/HynekJosefAllen/">Josef Allen Hynek (Northwestern University, Evanston, Illinois)</a></span>`)
    }
  })

  test("replace people tags", async () => {
    const dataService = new AllDataService([peopleFactory])
    const peopleService = new PeopleService(dataService, peopleFactory, {rootDir, files})
    const peopleRenderer = new PeopleHtmlRenderer()
    const replacer = new PeopleReplacer(peopleService, peopleRenderer)
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
    {
      const peopleWithTitle = createPeopleElement(context, "Jésus")
      const replacement = await replacer.replacement(context, peopleWithTitle)
      expect(replacement.outerHTML).toBe(
        `<span class="data-resolved people-resolved" translate="no"><a href="/test/people/j/Jesus/">Jésus</a></span>`)
    }
    {
      const peopleWithComposedFirstName = createPeopleElement(context, "Jean-Luc Vertongen")
      const replacement = await replacer.replacement(context, peopleWithComposedFirstName)
      expect(replacement.outerHTML).toBe(
        `<span title="1939-2015, 76 ans, Belgique, ufologue" class="data-resolved people-resolved deceased country-be occupation-ufologist" translate="no"><a href="/test/people/v/VertongenJeanLuc/">Jean-Luc Vertongen<img src="/test/people/v/VertongenJeanLuc/portrait.jpg" alt="Jean-Luc Vertongen" class="portrait" width="75"></a></span>`)
    }
    {
      const peopleWithTitle = createPeopleElement(context, "Reagan", "Ronald Reagan")
      const replacement = await replacer.replacement(context, peopleWithTitle)
      expect(replacement.outerHTML).toBe(
        `<span title="1911-2004, 93 ans, USA, acteur, politicien, dirigeant" class="data-resolved people-resolved deceased country-us occupation-actor occupation-politician occupation-leader" translate="no"><a href="/test/people/r/ReaganRonald/">Reagan<img src="/test/people/r/ReaganRonald/portrait.gif" alt="Reagan" class="portrait" width="75"></a></span>`)
    }
    {
      const peopleWithFullName = createPeopleElement(context, "Jérôme Beau")
      let replacement = await replacer.replacement(context, peopleWithFullName)
      expect(replacement.outerHTML).toBe(
        `<span class="data-resolved people-resolved" translate="no"><a href="/test/people/b/BeauJerome/">Jérôme Beau</a></span>`)
    }
    {
      const peopleWithLastName = createPeopleElement(context, "Beau")
      let replacement = await replacer.replacement(context, peopleWithLastName)
      expect(replacement.outerHTML).toBe(
        `<span class="data-resolved people-resolved" translate="no"><a href="/test/people/b/BeauJerome/">Beau</a></span>`)
    }
  })
})
