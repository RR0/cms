import { AnchorHandler } from "./AnchorHandler.js"
import { HtmlRR0Context } from "RR0Context.js"
import { TimeTextBuilder } from "../time/index.js"
import { CaseService } from "../science/crypto/ufo/enquete/dossier/CaseService.js"
import path from "path"
import { TimeContext } from "../time/TimeContext.mjs"

export class CaseAnchorHandler implements AnchorHandler {

  constructor(protected caseService: CaseService, protected timeTextBuilder: TimeTextBuilder) {
  }

  async handle(context: HtmlRR0Context, link: HTMLAnchorElement, pathToSearch: string) {
    if (!link.title) {
      const foundCases = await this.caseService.getFromDir(pathToSearch)
      const aCase = foundCases[0]
      if (aCase) {
        const caseContext = context.clone()
        caseContext.time.reset()
        const titles: string[] = []
        const caseTitle = aCase.title
        if (caseTitle && !titles.includes(caseTitle)) {
          titles.push(caseTitle)
        }
        const classification = aCase.classification
        const hynek = classification?.hynek
        if (hynek) {
          const classificationLabels = context.messages.case.classification.hynek[hynek]
          titles.push(classificationLabels.long)
        }
        const caseTime = aCase.time
        if (caseTime) {
          if (typeof caseTime === "string") {
            if (!titles.includes(caseTime)) {
              caseContext.time.updateFromStr(caseTime)
            }
          } else {
            caseContext.time = new TimeContext(caseTime.year?.value, caseTime.month?.value, caseTime.day?.value,
              caseTime.hour?.value, caseTime.minute?.value, caseTime.timeshift?.toString())
          }
          titles.push(this.timeTextBuilder.build(caseContext))
        }
        const place = aCase.place
        if (typeof place === "string" && !titles.includes(place)) {
          titles.push(place)
        }
        const conclusion = aCase.conclusion
        if (conclusion && !titles.includes(conclusion)) {
          link.classList.add(conclusion)
          titles.push(context.messages.case.conclusion[conclusion])
        }
        const image = (aCase as any).image
        if (image) {
          const doc = context.file.document
          const imgEl = doc.createElement("img")
          imgEl.src = path.join("/", image)
          imgEl.alt = aCase.title
          imgEl.className = "portrait"
          imgEl.loading = "lazy"
          imgEl.width = 75
          link.append(imgEl)
        }
        link.title = titles.join(", ")
      }
    }
  }
}
