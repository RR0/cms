import { HtmlRR0SsgContext, RR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { ObjectUtil, UrlUtil } from "../../../util"
import { JSDOM } from "jsdom"
import { UrecatCase, UrecatWitness } from "./UrecatCase"
import { TimeTextBuilder } from "../../TimeTextBuilder"
import { MessageUtils } from "../../../lang"
import { UrecatDatasource } from "./UrecatDatasource"
import { rr0TestUtil } from "../../../test"

export class UrecatHttpDatasource extends UrecatDatasource {

  protected static readonly urlDateFormat = /(\d\d\d\d)(?:-(\d\d)(?:-(\d\d))?)?/
  protected static readonly wordToCount: { [key: string]: number } = {
    "une": 1,
    "un": 1,
    "deux": 2,
    "trois": 3,
    "quatre": 4,
    "cinq": 5,
    "six": 6,
    "sept": 7
  }
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: URL, readonly searchPath = "ce3") {
    super(["Gross, Patrick"], "URECAT")
  }

  queryUrl(context: RR0SsgContext): URL {
    const time = context.time
    const day = time.getDayOfMonth()
    const month = time.getMonth()
    const year = time.getYear() ?? "full"
    const lang = context.locale === "fr" ? "f" : ""
    const requestUrl = UrlUtil.join(this.searchPath, `_${year}${lang}.htm`)
    return new URL(requestUrl, this.baseUrl)
  }

  getWitnesses(witnessesStr: string): UrecatWitness[] {
    let lastName = ""
    const andNames = witnessesStr
      .split(" et ")
      .flatMap(and => and.split(","))
      .map(m => m.trim())
      .map(m => m.replace(/^ses /, ""))
      .flatMap(name => {
        const lowName = name.toLowerCase()
        const countEntry = Object.entries(UrecatHttpDatasource.wordToCount).find(entry => {
          if (lowName.startsWith(entry[0] + " ")) {
            return entry
          }
        })
        if (countEntry && countEntry[1] > 1) {
          const oneName = lowName.substring(countEntry[0].length + 1).slice(0, -1)
          const witnessesNames = []
          for (let i = 1; i <= countEntry[1]; i++) {
            witnessesNames.push(oneName + " " + i)
          }
          return witnessesNames
        } else {
          const names = name.split(" ")
          if (names.length > 1) {
            lastName = names[names.length - 1]
          }
          return name
        }
      })
    return andNames.map(name => {
      if (name.indexOf(" ") < 0 && name.indexOf("'") < 0) {
        name = name + (lastName ? " " + lastName : "")
      }
      return {name}
    })
  }


  protected async readCases(context: HtmlRR0SsgContext): Promise<UrecatCase[]> {
    const searchUrl = this.queryUrl(context)
    const page = await this.http.fetch<string>(searchUrl, {headers: {accept: "text/html;charset=iso-8859-1"}})
    const doc = new JSDOM(page).window.document.documentElement
    const tableBody = doc.querySelector("th").parentElement.parentElement
    const rowEls = tableBody.querySelectorAll("tr")
    const rows = Array.from(rowEls)
    rows.shift()
    return Array.from(rows).map(row => this.getFromRow(context, row))
  }

  protected getLocation(column: HTMLTableCellElement) {
    let [placeName, departmentOrState, country] = column.textContent.split(",").map(s => s.trim())
    if (!country) {
      country = departmentOrState
      departmentOrState = undefined
    }
    return {placeName, country, departmentOrState}
  }

  protected getDate(context: RR0SsgContext, caseLink: URL, row: Element): RR0SsgContext {
    const timeStr = caseLink.pathname.substring(this.searchPath.length + 2)
    const dateFields = UrecatHttpDatasource.urlDateFormat.exec(timeStr)
    const itemContext = context.clone()
    const dateTime = itemContext.time
    dateTime.setYear(parseInt(dateFields[1], 10))
    const monthField = dateFields[2]
    if (monthField) {
      dateTime.setMonth(parseInt(monthField, 10))
      const dayOfMonth = dateFields[3]
      if (dayOfMonth) {
        dateTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
      }
    }
    return itemContext
  }

  protected getLink(linkCol: HTMLTableCellElement) {
    const caseLink = linkCol.firstElementChild as HTMLAnchorElement
    return new URL(UrlUtil.join(this.searchPath, caseLink.href), this.baseUrl)
  }

  protected getFromRow(context: RR0SsgContext, row: Element): UrecatCase {
    const columns = row.querySelectorAll("td")
    const url = this.getLink(columns[1])
    const caseContext = this.getDate(context, url, row)
    const {placeName, departmentOrState, country} = this.getLocation(columns[1])
    const witnesses = this.getWitnesses(columns[2].textContent)
    const timeStr = new TimeTextBuilder(rr0TestUtil.intlOptions).build(caseContext, true, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    )
    const sightingDate = caseContext.time
    const countStr = ObjectUtil.keyFromValue(UrecatHttpDatasource.wordToCount, witnesses.length)
    const title = `${timeStr}, ${placeName}, ${departmentOrState}, ${country}, ${countStr} ${MessageUtils.pluralWord(
      witnesses.length, "personne")}`.toUpperCase()
    const id = url.pathname.substring(this.searchPath.length + 2)
    return {
      id,
      time: sightingDate,
      url: url.href,
      title,
      basicInfo: {base: {sightingDate, location: {placeName, country, departmentOrState}, witnesses}}
    }
  }
}