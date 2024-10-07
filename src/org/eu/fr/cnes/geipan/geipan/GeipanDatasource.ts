import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { AbstractDatasource, TimeContextFilter } from "../../../../../../time"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../../../../RR0SsgContext"

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
