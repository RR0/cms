import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { rr0TestCases } from "./RR0TestCases.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { HtmlTag } from "../../../util/html/HtmlTag.js"
import { RR0CaseMapping } from "./RR0CaseMapping.js"
import { RR0Datasource } from "./RR0Datasource.js"
import { Datasource } from "../Datasource.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { TimeTextBuilder } from "../../text/TimeTextBuilder.js"
import { Source } from "@rr0/data/dist/source"
import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper"
import { RR0FileDatasource } from "./RR0FileDatasource"

import { CMSContext } from "../../../CMSContext"
import { NamedPlace } from "@rr0/place"

export class RR0TestDatasource extends RR0Datasource implements Datasource<RR0CaseSummary> {

  timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)

  constructor() { // Makes inherited constructor public
    super()
  }

  protected async readCases(_context: HtmlRR0Context): Promise<RR0CaseSummary[]> {
    return rr0TestCases
  }
}

export class RR0TestMapping implements RR0CaseMapping<RR0CaseSummary> {
  datasource = new RR0TestDatasource()
  backupDatasource: RR0FileDatasource
  mapper: RR0CaseSummaryMapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }

  init(build: CMSContext): this {
    this.mapper = new RR0CaseSummaryMapper(new URL("https://rr0.org"), "time", ["Beau, Jérôme"])
    this.backupDatasource = new class extends RR0FileDatasource {

    }(this.mapper)
    return this
  }
}


describe("RR0CaseSource", () => {

  const rr0TestMapping = new RR0TestMapping({read: ["fetch"], write: []})

  const testCase = new class extends DatasourceTestCase<RR0CaseSummary> {
    constructor(mapping: RR0CaseMapping<RR0CaseSummary>, sourceCases: RR0CaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: RR0CaseSummary): EdtfDate {
      return c.time
    }

    protected sortComparator(c1: RR0CaseSummary, c2: RR0CaseSummary): number {
      return !c1.time || c2.time && c1.time.isBefore(
        c2.time) ? -1 : !c2.time || c1.time.isAfter(c2.time) ? 1 : 0
    }

    /**
     * Specialization of sources for RR0 cases
     */
    protected expectedSourceStr(context: HtmlRR0Context, expectedSources: Source[], _nativeCase: RR0CaseSummary) {
      return expectedSources.map(source => {
        const sourceItems: string[] = []
        let authorStr = source.authors.map(author => `<span class="people">${author}</span>`).join(" &amp; ")
        if (authorStr) {
          authorStr += "&nbsp;: "
        }
        if (source.title) {
          sourceItems.push(source.title)
        }
        const publication = source.publication
        if (publication) {
          if (publication.publisher) {
            sourceItems.push(`<i>${publication.publisher}</i>`)
          }
          if (publication.time) {
            const sourceContext = context.clone()
            sourceContext.time.date = source.publication.time
            const timeStr = this.timeTextBuilder.build(sourceContext)
            sourceItems.push(timeStr)
          }
        }
        const index = source.index
        if (index) {
          sourceItems.push(index)
        }
        return " " + HtmlTag.toString("span", authorStr + sourceItems.join(", "), {class: "source"})
      }).join("")
    }
  }(rr0TestMapping.init(rr0TestUtil), rr0TestCases)

  let context: HtmlRR0Context

  beforeEach(() => {
    context = rr0TestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", async () => {
    await testCase.testRender(context)
  })

  test("id", async () => {
    expect(RR0Datasource.id(EdtfDate.fromString("1972-08-12"), new NamedPlace("Chatillon"))).toBe(
      "1972-08-12$Chatillon")
    expect(RR0Datasource.id(EdtfDate.fromString("1972-08-12"), undefined)).toBe("1972-08-12$")
    expect(RR0Datasource.id(undefined, undefined)).toBe("rr0-1$")
  })
})
