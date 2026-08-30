import { RR0CaseSummary } from "./datasource/rr0/RR0CaseSummary.js"
import { EventRenderer } from "./EventRenderer.js"
import { SourceFactory } from "../source/SourceFactory.js"
import { SourceRenderer } from "../source/SourceRenderer.js"
import { NoteRenderer } from "../note/NoteRenderer.js"
import { TimeElementFactory } from "./html/TimeElementFactory.js"

/**
 * Render a case summary as HTML.
 */
export class CaseSummaryRenderer extends EventRenderer<RR0CaseSummary> {

  constructor(noteRenderer: NoteRenderer, sourceFactory: SourceFactory, sourceRenderer: SourceRenderer,
              timeElementFactory: TimeElementFactory) {
    super(noteRenderer, sourceFactory, sourceRenderer, timeElementFactory)
  }
}
