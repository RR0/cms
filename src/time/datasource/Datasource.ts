import { HtmlRR0Context } from "../../RR0Context.js"

/**
 * A source for cases.
 *
 * @param S The source case type.
 */
export interface Datasource<S> {
  /**
   * The datasource authors to mention as a source.
   */
  readonly authors: string[]

  /**
   * The datasource name to mention as a source.
   */
  readonly copyright: string

  /**
   * Get cases matching a context, in the datasource native format.
   *
   * @param context
   * @return Promise<S[]>
   */
  fetch(context: HtmlRR0Context): Promise<S[]>
}
