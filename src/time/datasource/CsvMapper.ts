import { CaseMapper } from "./CaseMapper.js"
import { RR0Context } from "../../RR0Context.js"
import { Level2Date as EdtfDate } from "@rr0/time"

export class CsvMapper<S> implements CaseMapper<RR0Context, S, string> {

  readonly fields = new Set<string>()

  constructor(
    readonly sep = ",", readonly escapeStr = "\"", readonly prefix = "", protected maxLevel = 1) {
  }

  readonly fieldMapper = (context: RR0Context, key: string, value: any, sourceTime: Date, level = 0): string => {
    let addField = true
    let val: any
    if (value instanceof Date) {
      val = value.toISOString()
    } else if (typeof value === "string") {
      val = this.escape(value)
    } else if (value instanceof URL || value instanceof EdtfDate) {
      val = value.toString()
    } else if (Array.isArray(value)) {
      val = this.escape(
        value.map((item, i) => this.fieldMapper(context, String(i), item, sourceTime, level + 1)).join(this.sep),
        true)
    } else if (typeof value === "object") {
      if (level <= this.maxLevel) {
        const subMapper = new CsvMapper(this.sep, this.escapeStr, this.prefix + key + ".", level)
        const subValues = subMapper.map(context, value, sourceTime, level + 1)
        let addSubFields = !isFinite(key as any)
        if (addSubFields) {
          subMapper.fields.forEach(subField => this.fields.add(subField))
        }
        val = subValues
      }
      addField = false
    } else {
      val = value
    }
    if (addField) {
      this.fields.add(this.prefix + key)
    }
    return val
  }

  /**
   * Map a case to a CSV row.
   *
   * @param context
   * @param sourceCase
   * @param sourceTime
   * @param level
   */
  map(context: RR0Context, sourceCase: S, sourceTime: Date, level = 0): string {
    const sourceCaseEntries = Object.entries(sourceCase)
    const entries = Array.from(sourceCaseEntries).sort((entry1, entry2) => entry1[0].localeCompare(entry2[0]))
    return entries.map(entry => this.fieldMapper(context, entry[0], entry[1], sourceTime, level)).join(this.sep)
  }

  /**
   * Reduce a set of cases to a CSV string.
   *
   * @param context
   * @param sourceCases
   * @param sourceTime
   */
  mapAll(context: RR0Context, sourceCases: S[], sourceTime: Date): string {
    const values = sourceCases.map(c => this.map(context, c, sourceTime))
    return Array.from(this.fields).join(this.sep) + "\n" + values.join("\n")
  }

  escape(value: string, force?: boolean): string {
    if (this.escapeStr && (force || value.indexOf(this.sep) >= 0)) {
      value = value.replaceAll(this.escapeStr, this.escapeStr + this.escapeStr)
      return this.escapeStr + value + this.escapeStr
    } else {
      return value
    }
  }

  /**
   * Converts CSV contents to a list of cases.
   *
   * @param data
   * @param headers The headers info to fill, to keep CSV columns order.
   */
  parse(data: string, headers: string[] = []): S[] {
    let eol = data.indexOf("\n")
    const header = data.substring(0, eol)
    data = data.substring(eol + 1).replaceAll(`""`, "''")
    this.fields.clear()
    const columns = header.split(this.sep)
    headers.push(...columns)
    columns.forEach(column => this.fields.add(column))
    const records: S[] = []
    let regex = new RegExp(`(?:${this.escapeStr}(.*?)${this.escapeStr}(?:${this.sep}|\n))|(?:(.*?)(?:${this.sep}|\n))`,
      "gs")
    let values = []
    let m
    const fields = Array.from(this.fields)
    while ((m = regex.exec(data)) !== null) {
      if (m.index === regex.lastIndex) {  // This is necessary to avoid infinite loops with zero-width matches
        regex.lastIndex++
        if (regex.lastIndex > data.length) {
          break
        }
      }
      m.forEach((match, group) => {
        let empty = match === this.sep && group
        if (match !== undefined && group) {
          const val = empty ? "" : match
          values.push(val)
          const c = {}
          if (values.length === fields.length) {
            for (let i = 0; i < fields.length; i++) {
              const field = fields[i]
              c[field] = values[i]
            }
            records.push(c as S)
            values = []
            // data = data.substring(regex.lastIndex)
            //regex.lastIndex = 0
          }
        }
      })
    }
    return records
  }
}
