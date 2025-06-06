import { RR0Context } from "../../../RR0Context.js"
import { HttpSource } from "../HttpSource.js"
import { UrlUtil } from "../../../util/index.js"
import { JSDOM } from "jsdom"
import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { FuforaDatasource } from "./FuforaDatasource.js"
import { Level2Date as EdtfDate } from "@rr0/time"

interface FormData {
  /**
   * Start day
   */
  alkupv: number
  /**
   * Start month
   */
  alkukk: number
  /**
   * Start year
   */
  alkuvv: number
  /**
   * End day
   */
  loppupv: number
  /**
   * End month
   */
  loppukk: number
  /**
   * End year
   */
  loppuvv: number
  /**
   * Sighting place (city)
   */
  h_paikka: string
  /**
   * Case importance (only or min)
   * 0 = Not included in search, 1 = Peu d'importance, 9 = Très important
   * Sélectionnez soit une valeur unique, soit recherchez entre les valeurs
   */
  l1_valinta1: number
  /**
   * Case importance (max if min)
   * 0 = Not included in search, 1 = Peu d'importance, 9 = Très important
   * Sélectionnez soit une valeur unique, soit recherchez entre les valeurs
   */
  l1_valinta2?: number

  /**
   * Case type: Ball of light
   */
  l2_vap?: "vap"
  /**
   * Case type: abduction
   */
  l2_sie?: "sie"
  /**
   * Case type: close encounter
   */
  l2_pres?: "pres"
  /**
   * Case type: close encounter
   */
  l2_kon?: "kon"
  /**
   * Case type: missing time
   */
  l2_mis?: "mis"
  /**
   * Case type: moving light
   */
  l2_liv?: "liv"
  /**
   * Case type: unclear target
   */
  l2_esk?: "esk"
  /**
   * Case type: clear bottom detection
   */
  l2_alu?: "alu"
  /**
   * Case type: clear bottom detection
   */
  l2_hum?: "hum"

  /**
   * Case reliability: only or min (1-9)
   */
  l3_valinta1: 0
  /**
   * Case reliability: max if min (1-9)
   */
  l3_valinta2?: 0

  /**
   * Night
   */
  l4_yo?: "y"
  /**
   * Dawn
   */
  l4_ham?: "h"
  /**
   * Day
   */
  l4_pai?: "p"

  /**
   * Sighting area: Finlande du Sud (par exemple Helsinki, Hämeenlinna, Kouvola)
   */
  l5_es?: 1
  /**
   * Sighting area: Sud-ouest de la Finlande (par exemple Turku)
   */
  l5_ls?: 2
  /**
   * Sighting area: Finlande orientale (par exemple Mikkeli, Kuopio, Joensuu)
   */
  l5_is?: 3
  /**
   * Sighting area: Finlande occidentale et orientale (par exemple Vaasa, Tampere, Jyväskylä)
   */
  l5_lsis?: 4
  /**
   * Sighting area: Finlande du Nord (par exemple Oulu)
   */
  l5_ps?: 5
  /**
   * Sighting area: Laponie (y compris Rovaniemi)
   */
  l5_la?: 6
  /**
   * Sighting area: Åland (par exemple Mariehamn)
   */
  l5_ah?: 7
  /**
   * Sighting area: Pays étrangers
   */
  l5_ul?: 0

  tark: 1
}

export class FuforaHttpDatasource extends FuforaDatasource {
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: URL, readonly searchPath: string) {
    super()
  }

  async fetch(context: RR0Context): Promise<FuforaCaseSummary[]> {
    const {formData, searchUrl} = this.queryUrl(context)
    const page = await this.http.submitForm<string>(searchUrl, formData)
    const doc = new JSDOM(page).window.document.documentElement
    const rowEls = doc.querySelectorAll(".udb_u_taulukko .rivi")
    const rows = Array.from(rowEls)
    rows.shift()  // Skip header row
    return this.getFromRows(context, rows)
  }

  getFromRows(context: RR0Context, rows: Element[]): FuforaCaseSummary[] {
    const cases: FuforaCaseSummary[] = []
    for (const row of rows) {
      if (row.hasChildNodes()) {
        cases.push(this.getFromRow(context, row))
      }
    }
    return cases
  }

  queryUrl(context: RR0Context) {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const queryParams = {sid: ""}
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const formData: FormData = {
      alkupv: 1,
      alkukk: month,
      alkuvv: year,
      loppupv: 31,
      loppukk: month,
      loppuvv: year,
      h_paikka: "",
      l1_valinta1: 0,
      l3_valinta1: 0,
      tark: 1
    }
    const searchUrl = new URL(this.searchPath, this.baseUrl)
    searchUrl.search = queryParamsStr
    return {formData, searchUrl}
  }

  protected getFromRow(context: RR0Context, row: Element): FuforaCaseSummary {
    const fields = row.querySelectorAll("div")
    const caseLink = fields[0].firstElementChild as HTMLAnchorElement
    const dateFormat = /(?:(\d\d).(\d\d).(\d\d\d\d))?\n?(.+)?/
    const dateFields = dateFormat.exec(fields[1].textContent)
    const dayOfMonth = dateFields[1]
    const dateTime = new EdtfDate({
      year: parseInt(dateFields[3], 10),
      month: parseInt(dateFields[2], 10),
      day: dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined
    })
    const dateTimeRefinement = dateFields[4] ? dateFields[4].trim() : undefined
    const placeStr = fields[2].innerHTML
    const placeRows = placeStr.split("<br>")
    const sightingPlace = placeRows[0]
    const city = placeRows.length > 1 ? context.messages.country.fi.cityName(placeRows[1]) : undefined
    const url = new URL(caseLink.href, this.baseUrl)
    const id = new URLSearchParams(url.search).get("u")
    const classification = fields[3].textContent
    return {
      id,
      url: url.href,
      sightingPlace,
      city,
      dateTime,
      dateTimeRefinement,
      classification
    }
  }
}
