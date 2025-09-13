import { beforeEach, describe, test } from "@javarome/testscript"
import { ChronologyReplacer } from "./ChronologyReplacer.js"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer.js"
import { HtmlRR0Context } from "../../RR0Context.js"
import { cmsTestUtil } from "../../test/index.js"
import { SourceFactory, SourceRenderer } from "../../source/index.js"
import { NoteFileCounter, NoteRenderer } from "../../note/index.js"
import { TimeTextBuilder } from "../text/TimeTextBuilder.js"
import { HttpSource } from "./HttpSource.js"
import { AllDataService } from "@rr0/data"
import { UrecatRR0Mapping } from "./urecat/UrecatRR0Mapping.js"

describe("ChronologyReplacer", () => {

  let context: HtmlRR0Context
  let chronologyReplacer: ChronologyReplacer

  beforeEach(() => {
    const dataService = new AllDataService([])
    const baseUrl = "https://rr0.org"
    const http = new HttpSource()
    const timeTestUtil = cmsTestUtil.time
    const sourceFactory = new SourceFactory(dataService, http, baseUrl, cmsTestUtil.intlOptions,
      timeTestUtil.getService())
    const timeTextBuilder = new TimeTextBuilder(cmsTestUtil.intlOptions)
    const caseRenderer = new CaseSummaryRenderer(new NoteRenderer(new NoteFileCounter()), sourceFactory,
      new SourceRenderer(timeTextBuilder), timeTestUtil.timeElementFactory)
    const urecatRR0Mapping = new UrecatRR0Mapping({read: ["fetch"], write: ["backup"]}).init(cmsTestUtil)
    chronologyReplacer = new ChronologyReplacer([urecatRR0Mapping], caseRenderer)
    context = timeTestUtil.newHtmlContext("index.html")
    context.time.setYear(undefined)
//    context.time.setMonth(3)
  })

  test("save", () => {
    const replacement = chronologyReplacer.replacement(context, context.file.document.querySelector("ul"))
  })
})
