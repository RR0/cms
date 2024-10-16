import { TimeElementFactory, TimeService, TimeServiceOptions, TimeTextBuilder } from "../time/index.js"
import { RR0TestUtil, rr0TestUtil } from "../test"

export class TimeTestUtil {

  readonly timeTextBuilder: TimeTextBuilder
  timeElementFactory: TimeElementFactory
  timeOptions: TimeServiceOptions = {root: "src/time", files: []}
  protected timeService: TimeService

  constructor(rr0TestUtil: RR0TestUtil) {
    this.timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
  }

  async getTimeService(options: TimeServiceOptions = this.timeOptions): Promise<TimeService> {
    if (!this.timeService) {
      this.timeService = new TimeService(rr0TestUtil.dataService, this.timeTextBuilder, options)
      this.timeElementFactory = new TimeElementFactory(this.timeService.renderer)
      await this.timeService.getFiles()
    }
    return this.timeService
  }
}
