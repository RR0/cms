import { TimeRenderer } from "./html/TimeRenderer.js"
import { TimeTextBuilder } from "./text/TimeTextBuilder.js"
import { AbstractDataService, AllDataService } from "../data/index.js"
import { RR0Event } from "../event/index.js"
import { TimeUrlBuilder } from "./TimeUrlBuilder"

export type TimeServiceOptions = {
  readonly root: string,
  readonly files: string[]
}

export class TimeService extends AbstractDataService<RR0Event> {

  readonly renderer: TimeRenderer
  readonly root: string

  constructor(dataService: AllDataService, readonly textBuilder: TimeTextBuilder, readonly urlBuilder: TimeUrlBuilder,
              options: TimeServiceOptions) {
    super(dataService, null, options.files)
    this.root = options.root
    this.renderer = new TimeRenderer(this, this.textBuilder)
  }

  isTimeFile(filePath: string): boolean {
    return this.files.includes(filePath)
  }

  /**
   * @return the found time URL or undefined if not found.
   */
  matchExistingTimeFile(url: string): string | undefined {
    while (url && url !== this.root && this.files.indexOf(`${url}/index.html`) < 0) {
      const slash = url.lastIndexOf("/")
      url = url.substring(0, slash)
    }
    return url === this.root ? undefined : url
  }
}
