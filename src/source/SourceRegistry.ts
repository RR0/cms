import { HtmlRR0Context } from "../RR0Context.js"
import { HttpSource } from "../time/index.js"
import { SourceFactory } from "./SourceFactory.js"
import { AllDataService } from "@rr0/data"
import { Source } from "@rr0/data/dist/source"

/**
 * Create Source objects and register them.
 */
export class SourceRegistry extends SourceFactory {

  registry = {}

  constructor(dataService: AllDataService, http: HttpSource, baseUrl: string, options: Intl.DateTimeFormatOptions) {
    super(dataService, http, baseUrl, options)
  }

  /**
   * Create a Source object from an anchor's URL.
   *
   * @param context
   * @param href The anchor's URL string.
   */
  async createExternal(context: HtmlRR0Context, href: string): Promise<Source> {
    let source = await this.get(href)
    if (!source) {
      source = await super.createExternal(context, href)
      await this.register(href, source)
    }
    return source
  }

  protected async get(href: string): Promise<Source> {
    return this.registry[href]
  }

  protected async register(href: string, source: Source) {
    this.registry[href] = source
  }
}
