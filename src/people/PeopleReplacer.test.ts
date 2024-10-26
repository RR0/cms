import { PeopleReplacer } from "./PeopleReplacer.js"
import { rr0TestUtil } from "../test/index.js"
import { PeopleService } from "./PeopleService.js"
import { HtmlRR0Context } from "../RR0Context.js"
import { describe, expect, test } from "@javarome/testscript"
import { PeopleFactory } from "./PeopleFactory.js"
import path from "path"
import { AllDataService, RR0EventFactory } from "@rr0/data"

describe("PeopleReplacer", () => {

  const peopleRoot = "src/people"
  const peopleFiles = [
    path.join(peopleRoot, "b/BeauJerome"),
    path.join(peopleRoot, "h/HynekJosefAllen")
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

  test("ignore brackets", async () => {
    const dataService = new AllDataService([peopleFactory])
    const replacer = new PeopleReplacer(new PeopleService(dataService, peopleFactory, peopleFiles))
    const context = rr0TestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
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
    const replacer = new PeopleReplacer(new PeopleService(dataService, peopleFactory, peopleFiles))
    const context = rr0TestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
    {
      const peopleWithTitle = createPeopleElement(context, "Ronald Reagan", "Ronald Wilson Reagan")
      let replacement = await replacer.replacement(context, peopleWithTitle)
      expect(replacement.outerHTML).toBe(
        `<span translate="no"><a href="/src/people/r/ReaganRonald/">Ronald Reagan</a></span>`)
    }
    {
      const peopleWithFullName = createPeopleElement(context, "Jérôme Beau")
      let replacement = await replacer.replacement(context, peopleWithFullName)
      expect(replacement.outerHTML).toBe(
        `<span title="1972-, 50 ans, France, ufologue, Informaticien" class="country-fr occupation-ufologist occupation-softwareEngineer" translate="no"><a href="/src/people/b/BeauJerome/">Jérôme Beau</a></span>`)
    }
    {
      const peopleWithLastName = createPeopleElement(context, "Beau")
      let replacement = await replacer.replacement(context, peopleWithLastName)
      expect(replacement.outerHTML).toBe(
        `<span title="1972-, 50 ans, France, ufologue, Informaticien" class="country-fr occupation-ufologist occupation-softwareEngineer" translate="no" title="Jérôme Beau"><a href="/src/people/b/BeauJerome/" title="Jérôme Beau">Beau</a></span>`)
    }
  })
})
