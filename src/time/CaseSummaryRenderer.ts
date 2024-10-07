import { RR0CaseSummary } from "./datasource"
import { EventRenderer } from "./EventRenderer"
import { SourceFactory, SourceRenderer } from "../source"
import { NoteRenderer } from "../note"
import { TimeElementFactory } from "./TimeElementFactory"

/**
 * Render a case summary as HTML.
 */
export class CaseSummaryRenderer extends EventRenderer<RR0CaseSummary> {

  constructor(noteRenderer: NoteRenderer, sourceFactory: SourceFactory, sourceRenderer: SourceRenderer,
              timeElementFactory: TimeElementFactory) {
    super(noteRenderer, sourceFactory, sourceRenderer, timeElementFactory)
  }
}
