import { RR0CaseSummary } from "./datasource/index.js"
import { EventRenderer } from "./EventRenderer.js"
import { SourceFactory, SourceRenderer } from "../source/index.js"
import { NoteRenderer } from "../note/index.js"
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
