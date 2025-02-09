import { HttpSource } from "../time/datasource/HttpSource.js"
import { SourceRegistry } from "./SourceRegistry.js"
import { FileContents } from "@javarome/fileutil"
import { AllDataService } from "@rr0/data"
import { Source } from "@rr0/data/dist/source"
import { TimeService } from "../time"

/**
 * Create Source objects and register them.
 */
export class PersistentSourceRegistry extends SourceRegistry {

  constructor(dataService: AllDataService, http: HttpSource, baseUrl: string, protected fileName: string,
              options: Intl.DateTimeFormatOptions, time: TimeService) {
    super(dataService, http, baseUrl, options, time)
    try {
      const registryFileContents = FileContents.read(fileName, "utf-8").contents
      this.registry = JSON.parse(registryFileContents)
    } catch (e) {
      console.warn("Could not read persistent source registry", fileName, e)
    }
  }

  protected async get(href: string): Promise<Source> {
    return super.get(href)
  }

  protected async register(href: string, source: Source) {
    return super.register(href, source)
  }
}
