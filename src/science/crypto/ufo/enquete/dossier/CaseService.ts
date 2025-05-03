import path from "path"
import { RR0Case } from "./RR0Case.js"
import { HtmlRR0Context } from "../../../../../RR0Context.js"
import { TimeElementFactory } from "../../../../../time/index.js"
import { CaseFactory } from "./CaseFactory.js"
import { AbstractDataService, AllDataService } from "@rr0/data"
import { RR0CaseJson } from "./RR0CaseJson.js"
import { TimeContext } from "../../../../../time/TimeContext.mjs"

export class CaseService extends AbstractDataService<RR0Case, RR0CaseJson> {

  constructor(dataService: AllDataService, factory: CaseFactory,
              protected readonly timeElementFactory: TimeElementFactory, files: string[]) {
    super(dataService, factory, files)
  }

  getLink(context: HtmlRR0Context, aCase: RR0Case): HTMLElement {
    const details: string[] = []
    const classList = ["data-resolved"]
    const classification = aCase.classification
    const hynek = classification?.hynek
    if (hynek) {
      const classificationLabels = context.messages.case.classification.hynek[hynek]
      details.push(classificationLabels.short)
    }
    const time = aCase.time
    const caseContext = context.clone()
    if (time) {
      caseContext.time = new TimeContext(time.year?.value, time.month?.value, time.day?.value, time.hour?.value,
        time.minute?.value, time.timeshift?.toString())
      const options: Intl.DateTimeFormatOptions = {year: "numeric"}
      const {result, replacement} = this.timeElementFactory.renderer.renderContent(caseContext, undefined,
        {url: false, contentOnly: false},
        options)
      result.append(replacement)
      details.push(result.outerHTML)
    }
    const text: (string | string[])[] = [aCase.title]
    if (details.length > 0) {
      text.push(`(${details.join(", ")})`)
    }
    const doc = context.file.document
    const link = doc.createElement("a")
    link.innerHTML = text.join(" ")
    link.href = path.join("/", aCase.dirName)
    const span = doc.createElement("span")
    if (classList.length > 0) {
      span.classList.add(...classList)
    }
    span.append(link)
    return span
  }

}
