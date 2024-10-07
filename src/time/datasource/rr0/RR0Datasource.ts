import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { AbstractDatasource } from "../AbstractDatasource.js"
import { TimeContextFilter } from "../TimeContextFilter.js"

export class RR0ContextFilter extends TimeContextFilter<RR0CaseSummary> {
}

export abstract class RR0Datasource extends AbstractDatasource<RR0CaseSummary> {
  static readonly placeRegex = /^(.+?)(?:\s*\((.+?)(?:\s*,\s*(.+?)(?:\s*,\s*(.+?)))?\))?$/g

  protected constructor() {
    super(["Beau, Jérôme"], "RR0")
  }
}
