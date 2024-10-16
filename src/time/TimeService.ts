import { TimeRenderer } from "./TimeRenderer.js"
import { TimeTextBuilder } from "./TimeTextBuilder.js"
import { AbstractDataService, AllDataService } from "../data/index.js"
import { RR0Event } from "../event/index.js"
import { glob } from "glob"

export type TimeServiceOptions = {
  readonly root: string,
  readonly files: string[]
}

export class TimeService extends AbstractDataService<RR0Event> {

  readonly renderer: TimeRenderer
  readonly root: string

  constructor(dataService: AllDataService, readonly textBuilder: TimeTextBuilder, options: TimeServiceOptions) {
    super(dataService, null, options.files)
    this.root = options.root
    this.renderer = new TimeRenderer(this, this.textBuilder)
  }

  async getFiles(): Promise<string[]> {
    if (!this.files || this.files.length <= 0) {
      const minusYearFiles = await glob("time/-?/?/?/?/index.html")
      const year1Files = await glob("time/?/index.html")
      const year2Files = await glob("time/?/?/index.html")
      const year3Files = await glob("time/?/?/?/index.html")
      const year4Files = await glob("time/?/?/?/?/index.html")
      const monthFiles = await glob("time/?/?/?/?/??/index.html")
      const dayFiles = await glob("time/?/?/?/?/??/??/index.html")
      this.files = year1Files.concat(year2Files).concat(year3Files).concat(year4Files).concat(
        minusYearFiles).concat(monthFiles).concat(dayFiles).sort()
    }
    return this.files
  }

  async isTimeFile(filePath: string): Promise<boolean> {
    const files = await this.getFiles()
    return files.includes(filePath)
  }

  /**
   * @return the found time URL or undefined if not found.
   */
  matchExistingTimeFile(url: string): string | undefined {
    while (url !== this.root && this.files.indexOf(`${url}/index.html`) < 0) {
      const slash = url.lastIndexOf("/")
      url = url.substring(0, slash)
    }
    return url === this.root ? undefined : url
  }
}
