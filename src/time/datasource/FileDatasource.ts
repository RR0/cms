import { HtmlRR0Context } from "../../RR0Context.js"
import { Datasource } from "./Datasource.js"

export interface FileDatasource<S> extends Datasource<S> {

  save(context: HtmlRR0Context, fetched: any[], fetchTime: Date): void
}
