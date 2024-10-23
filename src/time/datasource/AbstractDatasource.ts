import { Datasource } from "./Datasource"
import { HtmlRR0Context } from "../../RR0Context.js"
import { ContextFilter } from "./ContextFilter.js"
import { TimeContextFilter } from "./TimeContextFilter.js"

/**
 * Cache cases which were already fetched, and filter out cases in memory according to (time) context.
 */
export abstract class AbstractDatasource<S> implements Datasource<S> {

  protected readonly cases = new Map<string, S[]>()

  protected constructor(readonly authors: string[], readonly copyright: string) {
  }

  async getCases(context: HtmlRR0Context): Promise<S[]> {
    const contextKey = this.contextKey(context)
    let found = this.cases.get(contextKey)
    if (!found) {
      found = await this.readCases(context)
      this.cases.set(contextKey, found)
    }
    return found
  }

  async fetch(context: HtmlRR0Context): Promise<S[]> {
    const summaries = await this.getCases(context)
    // TODO: This filter can only apply to RROUfoCases[], not S[]
    const contextFilter = this.createFilter(context)
    return summaries.filter(contextFilter.filter.bind(contextFilter))
  }

  protected createFilter(context: HtmlRR0Context): ContextFilter<S> {
    return new TimeContextFilter<S>(context)  // By default
  }

  protected contextKey(context: HtmlRR0Context) {
    return context.time.toString()
  }

  protected abstract readCases(context: HtmlRR0Context): Promise<S[]>
}
