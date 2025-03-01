import path from "path"
import { Level2Date as EdtfDate, TimeContext } from "@rr0/time"
import { TimeOptions } from "./TimeOptions.js"

export type TimeUrlBuilderOptions = TimeOptions

export class TimeUrlBuilder {

  constructor(readonly options: TimeUrlBuilderOptions) {
  }

  fromContext(time: TimeContext): string {
    return this.fromYYMMDD(time.getYear(), time.getMonth(), time.getDayOfMonth())
  }

  fromEdtf(time: EdtfDate): string {
    return this.fromYYMMDD(time.year?.value, time.month?.value, time.day?.value)
  }

  fromYYMMDD(year: number, month: number, day: number) {
    let url = this.options.rootDir
    if (year) {
      url = path.join(url, year.toString().split("").join("/"))
    }
    if (month) {
      url += `/${month.toString().padStart(2, "0")}`
    }
    if (day) {
      url += `/${day.toString().padStart(2, "0")}`
    }
    return url
  }

  isTimeFile(filePath: string): boolean {
    return this.options.files.includes(filePath)
  }

  /**
   * @return the found time URL or undefined if not found.
   */
  matchExistingTimeFile(url: string): string | undefined {
    const rootDir = this.options.rootDir
    while (url && url !== rootDir && !this.isTimeFile(`${url}/index.html`)) {
      const slash = url.lastIndexOf("/")
      url = url.substring(0, slash)
    }
    return url === rootDir ? undefined : url
  }
}
