import { HtmlRR0Context } from "../RR0Context.js"
import { HttpSource, TimeService } from "../time/index.js"
import { SourceFactory } from "./SourceFactory.js"
import { AllDataService, RR0SourceType, Source } from "@rr0/data"

/**
 * Create Source objects and register them.
 */
export class SourceRegistry extends SourceFactory {

  registry = {}

  constructor(dataService: AllDataService, http: HttpSource, baseUrl: string, options: Intl.DateTimeFormatOptions,
              time: TimeService) {
    super(dataService, http, baseUrl, options, time)
  }

  /**
   * Create a Source object from an anchor's URL.
   *
   * @param context
   * @param href The anchor's URL string.
   */
  async createExternal(context: HtmlRR0Context, href: string): Promise<Source<RR0SourceType>> {
    let source = await this.get(href)
    if (!source) {
      source = await super.createExternal(context, href)
      await this.register(href, source)
    }
    return source
  }

  protected async get(href: string): Promise<Source<RR0SourceType>> {
    return this.registry[href]
  }

  protected async register(href: string, source: Source<RR0SourceType>) {
    this.registry[href] = source
  }
}
