import { TimeContext } from "./TimeContext.js"
import path from "path"

export type TimeUrlBuilderOptions = {
  rootDir: string
}

export class TimeUrlBuilder {

  constructor(readonly options: TimeUrlBuilderOptions) {
  }

  fromContext(time: TimeContext): string {
    let url = this.options.rootDir
    const year = time.getYear()
    if (year) {
      url = path.join(url, year.toString().split("").join("/"))
    }
    let month = time.getMonth()
    if (month) {
      url += "/" + month.toString().padStart(2, "0")
    }
    let day = time.getDayOfMonth()
    if (day) {
      url += "/" + day.toString().padStart(2, "0")
    }
    return url
  }
}
