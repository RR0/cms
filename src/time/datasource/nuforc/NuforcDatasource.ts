import { NuforcCaseSummary } from "./NuforcCaseSummary.js"
import { RR0Context } from "../../../RR0Context.js"
import { AbstractDatasource } from "../AbstractDatasource.js"

export abstract class NuforcDatasource extends AbstractDatasource<NuforcCaseSummary> {

  protected constructor(authors: string[] = ["NUFORC"], copyright = "Online Database") {
    super(authors, copyright)
  }

  protected abstract readCases(context: RR0Context): Promise<NuforcCaseSummary[]>
}
