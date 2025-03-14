import { RR0Context } from "../../../RR0Context.js"
import { HttpSource } from "../HttpSource.js"
import { UrlUtil } from "../../../util/index.js"
import { JSDOM } from "jsdom"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { Level2Date as EdtfDate, Level2Timeshift } from "@rr0/time"
import assert from "assert"
import { BaseOvniFranceDatasource } from "./BaseOvniFranceDatasource.js"

enum ListType {
  perMonth = 20
}

enum Cre {
  export = 1
}

interface QueryParameters {
  typlist: ListType
  cre?: Cre
  an?: number
  mois?: number
  page?: number
}

interface FormData {
  mois: string
  an: number
  B1: "Envoyer"
}

export class BaseOvniFranceHttpDatasource extends BaseOvniFranceDatasource {
  protected static readonly regExp = /(.*?)\s+\(([\dAB]+)\)/
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: URL = new URL("http://baseovnifrance.free.fr"), readonly searchPath = "listgen.php") {
    super()
  }

  queryUrl(context: RR0Context): { formData: FormData; queryUrl: URL } {
    const time = context.time
    const day = time.getDayOfMonth()
    const month = time.getMonth()
    const year = time.getYear()
    const queryParams: QueryParameters = {typlist: ListType.perMonth, page: 0}
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const formData: FormData = {mois: String(month).padStart(2, "0"), an: year, B1: "Envoyer"}
    const queryUrl = new URL(this.searchPath, this.baseUrl)
    queryUrl.search = queryParamsStr
    return {formData, queryUrl}
  }

  protected async readCases(context: RR0Context): Promise<BaseOvniFranceCaseSummary[]> {
    const {formData, queryUrl} = this.queryUrl(context)
    const page = await this.http.submitForm<string>(queryUrl, formData, {accept: "text/html;charset=iso-8859-1"})
    const doc = new JSDOM(page).window.document.documentElement
    const rowEls = doc.querySelectorAll("#listgen2 tbody tr")
    const rows = Array.from(rowEls)
    rows.shift()  // Skip header row
    const cases: BaseOvniFranceCaseSummary[] = []
    for (const row of rows) {
      cases.push(this.getFromRow(context, row))
    }
    return cases
  }

  protected getBoolean(field: HTMLTableCellElement): boolean {
    return field.textContent === "Oui"
  }

  protected getDate(context: RR0Context, dateField: HTMLTableCellElement): EdtfDate {
    const dateFormat = /(\d\d)-(\d\d)-(\d\d\d\d)/
    const dateFields = dateFormat.exec(dateField.textContent)
    const dayOfMonth = dateFields[1]
    return new EdtfDate({
      year: parseInt(dateFields[3], 10),
      month: parseInt(dateFields[2], 10),
      day: dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined
    })
  }

  protected setTime(dateTime: EdtfDate, timeField: HTMLTableCellElement) {
    const timeFormat = /(\d\d):(\d\d)/
    const timeFields = timeFormat.exec(timeField.textContent)
    const hour = timeFields ? parseInt(timeFields[1], 10) : undefined
    const minutes = timeFields ? parseInt(timeFields[2], 10) : undefined
    dateTime.hour = hour
    dateTime.minute = minutes
    dateTime.timeshift = Level2Timeshift.fromString("+01") // GMT+1/UTC+1
  }

  protected getFromRow(context: RR0Context, row: Element): BaseOvniFranceCaseSummary {
    const columns = row.querySelectorAll("td")
    const caseLink = columns[0].firstElementChild as HTMLAnchorElement
    const url = new URL(caseLink.href, this.baseUrl)
    const id = new URLSearchParams(url.search).get("numobs")
    const linkParse = BaseOvniFranceHttpDatasource.regExp.exec(caseLink.textContent)
    assert.ok(linkParse,
      `Case title "${caseLink.textContent}" does not match pattern ${BaseOvniFranceHttpDatasource.regExp.source}`)
    const place = linkParse[1]
    const depCode = linkParse[2].padStart(2, "0")
    const time = this.getDate(context, columns[1])
    this.setTime(time, columns[2])
    const physicalEffect = this.getBoolean(columns[3])
    const witnessEffect = this.getBoolean(columns[4])
    const entities = this.getBoolean(columns[5])
    const landing = this.getBoolean(columns[6])
    return {
      id,
      url: url.href,
      city: place,
      depCode: depCode,
      time,
      physicalEffect,
      witnessEffect,
      entities,
      landing
    }
  }
}
