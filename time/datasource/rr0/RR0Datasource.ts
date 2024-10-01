import { RR0CaseSummary } from "./RR0CaseSummary"
import { AbstractDatasource } from "../AbstractDatasource"
import { TimeContextFilter } from "../TimeContextFilter"

export class RR0ContextFilter extends TimeContextFilter<RR0CaseSummary> {
}

export abstract class RR0Datasource extends AbstractDatasource<RR0CaseSummary> {
  static readonly placeRegex = /^(.+?)(?:\s*\((.+?)(?:\s*,\s*(.+?)(?:\s*,\s*(.+?)))?\))?$/g

  protected constructor() {
    super(["Beau, Jérôme"], "RR0")
  }
}
