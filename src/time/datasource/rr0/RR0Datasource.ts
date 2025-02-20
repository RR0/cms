import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { AbstractDatasource } from "../AbstractDatasource.js"
import { TimeContextFilter } from "../TimeContextFilter.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { Place } from "@rr0/place"

export class RR0ContextFilter extends TimeContextFilter<RR0CaseSummary> {
}

export abstract class RR0Datasource extends AbstractDatasource<RR0CaseSummary> {
  static readonly placeRegex = /^(.+?)(?:\s*\((.+?)(?:\s*,\s*(.+?)(?:\s*,\s*(.+?)))?\))?$/g

  protected constructor() {
    super(["Beau, Jérôme"], "RR0")
  }

  static id(dateTime: EdtfDate, place: Place | undefined): string {
    return `${dateTime.toString()}$${(place?.toString() ?? "")}`
  }
}
