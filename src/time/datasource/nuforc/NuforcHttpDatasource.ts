import { RR0Context } from "../../../RR0Context.js"
import { HttpSource } from "../HttpSource.js"
import { UrlUtil } from "../../../util/index.js"
import { NuforcCaseSummary } from "./NuforcCaseSummary.js"
import { ObjectUtil } from "../../../util/ObjectUtil.js"
import { NuforcState } from "./NuforcState.js"
import assert from "assert"
import { Level2Date as EdtfDate } from "@rr0/time"
import { NuforcCountry } from "./NuforcCountry.js"
import { NuforcShape } from "./NuforcShape.js"
import { NuforcDatasource } from "./NuforcDatasource.js"

interface QueryParameters {
  id: string
}

export class NuforcHttpDatasource extends NuforcDatasource {
  protected static readonly dateFormat = /(\d\d)\/(\d\d)\/(\d\d\d\d) (\d\d):(\d\d)/
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: URL = new URL("https://nuforc.org"), readonly searchPath = "subndx") {
    super()
  }

  protected queryUrl(context: RR0Context): URL {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const queryParams: QueryParameters = {
      id: "e" + year + String(month).padStart(2, "0")
    }
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const searchUrl = new URL(this.searchPath, this.baseUrl)
    searchUrl.search = queryParamsStr
    return searchUrl
  }

  protected async readCases(context: RR0Context): Promise<NuforcCaseSummary[]> {
    const searchUrl = this.queryUrl(context)
    const doc = await this.http.get(searchUrl, {headers: {accept: "text/html;charset=utf-8"}})
    const rowEls = doc.querySelectorAll("#table_1 tbody tr")
    return Array.from(rowEls).map(row => this.getNativeCase(context, row))
  }

  protected getShape(shapeField: HTMLTableCellElement): NuforcShape {
    return NuforcShape[shapeField.textContent]
  }

  protected getCountry(countryField: HTMLTableCellElement): NuforcCountry {
    const countryStr = countryField.textContent
    const country = ObjectUtil.enumFromValue<NuforcCountry>(NuforcCountry, countryStr)
    assert.ok(country, `Unknown NUFORC country "${countryStr}"`)
    return country
  }

  protected getState(caseField: HTMLTableCellElement): NuforcState {
    const stateStr = caseField.textContent
    return ObjectUtil.enumFromValue<NuforcState>(NuforcState, stateStr)
  }

  protected getTime(dateField: HTMLTableCellElement, context: RR0Context): EdtfDate {
    const dateFields = NuforcHttpDatasource.dateFormat.exec(dateField.textContent)
    const dayOfMonth = dateFields[2]
    const hour = parseInt(dateFields[4], 10)
    const minutes = parseInt(dateFields[5], 10)
    return new EdtfDate({
      year: parseInt(dateFields[3], 10),
      month: parseInt(dateFields[1], 10),
      day: dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined,
      hour,
      minute: minutes
    })
  }

  protected getLink(caseField: HTMLTableCellElement): URL {
    const caseLink = caseField.firstElementChild as HTMLAnchorElement
    return new URL(caseLink.href, this.baseUrl)
  }

  protected dateFromField(reportField: HTMLTableCellElement) {
    return new Date(reportField.textContent)
  }

  protected getImage(imageField: HTMLTableCellElement) {
    return imageField.textContent === "Y"
  }

  protected getNativeCase(context: RR0Context, row: Element): NuforcCaseSummary {
    const columns = row.querySelectorAll("td")
    const url = this.getLink(columns[0])
    const caseNumber = new URLSearchParams(url.search).get("id")
    const time = this.getTime(columns[1], context)
    const city = columns[2].textContent
    const state = this.getState(columns[3])
    const country = this.getCountry(columns[4])
    const shape = this.getShape(columns[5])
    const summary = columns[6].textContent
    const reportDate = this.dateFromField(columns[7])
    const postDate = this.dateFromField(columns[8])
    const image = this.getImage(columns[9])
    return {id: caseNumber, url: url.href, city, state, country, time, shape, summary, reportDate, postDate, image}
  }
}
