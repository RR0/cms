import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { AbstractDatasource, TimeContextFilter } from "../../../../../../time/index.js"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../../../../RR0SsgContext.js"

export abstract class GeipanDatasource extends AbstractDatasource<GeipanCaseSummary> {

  protected constructor(authors = ["GEIPAN"], copyright = "Catalogue de cas") {
    super(authors, copyright)
  }

  protected createFilter(context: HtmlRR0SsgContext) {
    // TODO: Use a GEIPAN-specific filter instead
    return new TimeContextFilter<GeipanCaseSummary>(context)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<GeipanCaseSummary[]>
}
