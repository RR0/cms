import { RR0CaseSummary } from "./RR0CaseSummary.js"
import { AbstractDatasource } from "../AbstractDatasource.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { Place } from "@rr0/place"
import { StringUtil } from "../../../util/string/StringUtil.js"

export abstract class RR0Datasource extends AbstractDatasource<RR0CaseSummary> {

  static idCount = 0

  static readonly placeRegex = /^(.+?)(?:\s*\((.+?)(?:\s*,\s*(.+?)\s*,\s*(.+?))?\))?$/g

  protected constructor() {
    super(["Beau, Jérôme"], "RR0")
  }

  static id(dateTime: EdtfDate, place: Place | undefined): string {
    return `${dateTime?.toString() || ("rr0-" + ++this.idCount)}$${(place ? StringUtil.textToCamel(
      place.toString()) : "")}`
  }
}
