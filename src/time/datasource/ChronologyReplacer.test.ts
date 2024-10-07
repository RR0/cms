import { beforeEach, describe, test } from "@javarome/testscript"
import { ChronologyReplacer } from "./ChronologyReplacer"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer"
import { urecatRR0Mapping } from "./urecat"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { rr0TestUtil } from "../../test"
import { SourceFactory, SourceRenderer } from "../../source"
import { NoteFileCounter, NoteRenderer } from "../../note"
import { TimeTextBuilder } from "../TimeTextBuilder"
import { AllDataService } from "../../data"
import { HttpSource } from "./HttpSource"

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
      new SourceRenderer(timeTextBuilder), rr0TestUtil.timeElementFactory)
    chronologyReplacer = new ChronologyReplacer([urecatRR0Mapping], caseRenderer)
    context = rr0TestUtil.newHtmlContext("time/index.html")
    context.time.setYear(undefined)
//    context.time.setMonth(3)
  })

  test("save", () => {
    const replacement = chronologyReplacer.replacement(context, context.file.document.querySelector("ul"))
  })
})
