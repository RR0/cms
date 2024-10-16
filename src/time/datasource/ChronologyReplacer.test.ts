import { beforeEach, describe, test } from "@javarome/testscript"
import { ChronologyReplacer } from "./ChronologyReplacer.js"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer.js"
import { urecatRR0Mapping } from "./urecat/index.js"
import { HtmlRR0SsgContext } from "../../RR0SsgContext.js"
import { rr0TestUtil } from "../../test/index.js"
import { SourceFactory, SourceRenderer } from "../../source/index.js"
import { NoteFileCounter, NoteRenderer } from "../../note/index.js"
import { TimeTextBuilder } from "../TimeTextBuilder.js"
import { AllDataService } from "../../data/index.js"
import { HttpSource } from "./HttpSource.js"

describe("ChronologyReplacer", () => {

  let context: HtmlRR0SsgContext
  let chronologyReplacer: ChronologyReplacer

  beforeEach(() => {
    const dataService = new AllDataService([])
    const baseUrl = "https://rr0.org"
    const http = new HttpSource()
    const sourceFactory = new SourceFactory(dataService, http, baseUrl, rr0TestUtil.intlOptions)
    const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    const caseRenderer = new CaseSummaryRenderer(new NoteRenderer(new NoteFileCounter()), sourceFactory,
      new SourceRenderer(timeTextBuilder), rr0TestUtil.time.timeElementFactory)
    chronologyReplacer = new ChronologyReplacer([urecatRR0Mapping], caseRenderer)
    context = rr0TestUtil.newHtmlContext("time/index.html")
    context.time.setYear(undefined)
//    context.time.setMonth(3)
  })

  test("save", () => {
    const replacement = chronologyReplacer.replacement(context, context.file.document.querySelector("ul"))
  })
})
