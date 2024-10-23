import { UfoCaseFilter } from "./UfoCaseFilter.js"
import { RR0Context } from "../../RR0Context.js"

export abstract class ContextFilter<T> implements UfoCaseFilter<T> {
  /**
   * @param context The context to match
   * @protected
   */
  protected constructor(protected context: RR0Context) {
  }

  /**
   * @param ufoCase
   * @return if that UFO case matches the filter.
   */
  abstract filter(ufoCase: T): boolean
}
